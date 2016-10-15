SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = true;
SET client_min_messages = warning;
SET row_security = off;
SET search_path = public, pg_catalog;
SET default_tablespace = '';
SET default_with_oids = false;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA public;

CREATE TABLE config (
	key varchar(128) NOT NULL,
	value jsonb NOT NULL DEFAULT '{}'::jsonb,
	CONSTRAINT config_pkey PRIMARY KEY (key),
	CONSTRAINT config_key_check CHECK(key ~ '^[A-Za-z][0-9A-Za-z]*$')
) WITH (OIDS = FALSE);
CREATE INDEX config_value_idx ON config USING gin (value);

-- Add main config
INSERT INTO config (key, value) VALUES(
	'sessionDuration',
	'300000'::jsonb
);

-- Roles
CREATE TYPE roles AS ENUM ('admin', 'hotel', 'client');

-- User data storage
CREATE TABLE users (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	enable boolean NOT NULL DEFAULT TRUE,
	email character varying(256) NOT NULL,
	password char(128) NOT NULL,
	otpsecret bigint DEFAULT NULL,
	oauth json NOT NULL DEFAULT '{}'::json,
	roles roles[] NOT NULL DEFAULT '{}'::roles[],
	data json NOT NULL DEFAULT '{}'::json,
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT users_email_check CHECK (email ~ '^[a-z0-9_\.%+-]+@[a-z0-9_\.-]+?[a-z0-9]$'),
	CONSTRAINT users_password_check CHECK(password ~ '^[0-9a-f]+$')
) WITH (OIDS = FALSE);
CREATE INDEX users_enable_idx ON users USING btree (enable);
CREATE UNIQUE INDEX users_email_unique_idx ON users USING btree (email);

-- Add global application administrator
INSERT INTO users (id, enable, email, password) VALUES (
	'00000000-0000-1000-0000-000000000000',
	TRUE,
	'admin@arabtravel',
	encode(digest('password', 'sha512'), 'hex')
);

-- Prevent delete administrator
CREATE FUNCTION users_prevent_delete_admin() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
	IF (OLD.id = '00000000-0000-1000-0000-000000000000') THEN
		RAISE EXCEPTION 'This user is locked by application policy';
	END IF;
	RETURN OLD;
END;
$$;
CREATE TRIGGER users_prevent_delete_admin_trigger BEFORE DELETE ON users
				FOR EACH ROW EXECUTE PROCEDURE users_prevent_delete_admin();

-- Prevent change id of administrator
CREATE FUNCTION users_prevent_update_admin_id() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
	IF (OLD.id = '00000000-0000-1000-0000-000000000000' AND
		NEW.id <> '00000000-0000-1000-0000-000000000000' ) THEN
			RAISE EXCEPTION 'Prevent change id for this user by application policy';
	END IF;
	RETURN NEW;
END;
$$;
CREATE TRIGGER users_prevent_update_admin_id_trigger BEFORE UPDATE ON users
				FOR EACH ROW EXECUTE PROCEDURE users_prevent_update_admin_id();

-- Session data storage
CREATE TABLE sessions (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	userid uuid NOT NULL,
	ts timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),
	data json NOT NULL DEFAULT '{}'::json,
	ip inet,
	CONSTRAINT sessions_pkey PRIMARY KEY (id),
	CONSTRAINT sessions_user_fkey FOREIGN KEY (userid) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
) WITH (OIDS = FALSE);
CREATE INDEX sessions_userid_idx ON sessions USING btree (userid);
CREATE INDEX sessions_ts_idx ON sessions USING btree (ts);

-- Set session ts
CREATE FUNCTION sessions_update_ts() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
	NEW.ts = timezone('UTC', now());
	RETURN NEW;
END;
$$;
CREATE TRIGGER sessions_update_ts_trigger BEFORE INSERT OR UPDATE ON sessions
				FOR EACH ROW EXECUTE PROCEDURE sessions_update_ts();

-- Clear old sessions
CREATE FUNCTION sessions_delete_old_rows() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
	DELETE FROM sessions WHERE ts < timezone('UTC', NOW() - (COALESCE((SELECT value->>0 FROM config WHERE key = 'sessionDuration' LIMIT 1)::integer,86400)::text||' seconds')::interval);
	RETURN NULL;
END;
$$;
CREATE TRIGGER sessions_delete_old_rows_trigger AFTER INSERT ON sessions
				FOR EACH STATEMENT EXECUTE PROCEDURE sessions_delete_old_rows();

-- Objects data store
CREATE TABLE objects (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	model varchar(128) NOT NULL,
	owner uuid DEFAULT NULL,
	enable boolean NOT NULL DEFAULT TRUE,
	deleted boolean NOT NULL DEFAULT FALSE,
	data json NOT NULL DEFAULT '{}'::json,
	CONSTRAINT objects_pkey PRIMARY KEY (id),
	CONSTRAINT objects_model_check CHECK (model ~ '^[a-z0-9\-]+$'),
	CONSTRAINT objects_user_fkey FOREIGN KEY (owner) REFERENCES users (id) ON UPDATE CASCADE ON DELETE SET NULL
) WITH (OIDS = FALSE);

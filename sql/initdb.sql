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

-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA public;

CREATE TABLE config (
	key varchar(128) NOT NULL,
	value jsonb NOT NULL DEFAULT '{}'::jsonb,
	CONSTRAINT config_pkey PRIMARY KEY (key),
	CONSTRAINT config_key_check CHECK(key ~ '^[A-Za-z][0-9A-Za-z]*$')
) WITH (OIDS = FALSE);
CREATE INDEX config_value_idx ON config USING gin (value);

-- Add config
INSERT INTO config (key, value) VALUES(
	'sessionDuration',
	'300000'::jsonb
);

-- Roles
CREATE TYPE roles AS ENUM ('admin', 'user', 'hotel');

-- User data storage
CREATE TABLE users (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	enable boolean NOT NULL DEFAULT TRUE,
	email character varying(256) NOT NULL,
	password char(128) DEFAULT NULL,
	roles roles[] NOT NULL DEFAULT '{user}'::roles[],
	title text NOT NULL DEFAULT ''::text,
	data json NOT NULL DEFAULT '{}'::json,
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT users_email_check CHECK (email ~ '^[a-z0-9_\.%+-]+@[a-z0-9_\.-]+?[a-z0-9]$'),
	CONSTRAINT users_password_check CHECK(password ~ '^[0-9a-f]+$')
) WITH (OIDS = FALSE);
CREATE INDEX users_enable_idx ON users USING btree (enable);
CREATE UNIQUE INDEX users_email_unique_idx ON users USING btree (email);

-- Add global application administrator
INSERT INTO users (id, enable, email, password, roles, title) VALUES (
	'00000000-0000-1000-0000-000000000000',
	TRUE,
	'admin@arabtravel.jo',
	encode(digest('password', 'sha512'), 'hex'),
	'{admin}'::roles[],
	'Administrator'
);

-- Prevent corrupt global admin user
CREATE FUNCTION users_prevent_corrupt_admin() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
	IF (TG_OP = 'DELETE' AND OLD.id <> '00000000-0000-1000-0000-000000000000') THEN
		RETURN OLD;
	ELSIF (OLD.id <> '00000000-0000-1000-0000-000000000000') THEN
		RETURN NEW;
	ELSIF (OLD.id = '00000000-0000-1000-0000-000000000000' AND NEW.id = '00000000-0000-1000-0000-000000000000' AND NEW.roles @> '{admin}'::roles[] AND NEW.enable) THEN
		RETURN NEW;
	END IF;
	RAISE EXCEPTION 'APPLICATION_POLICY';
END;
$$;
CREATE TRIGGER users_prevent_corrupt_admin_trigger BEFORE UPDATE OR DELETE ON users FOR EACH ROW EXECUTE PROCEDURE users_prevent_corrupt_admin();

-- Session data storage
CREATE TABLE sessions (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	owner uuid NOT NULL,
	ts timestamp without time zone NOT NULL DEFAULT timezone('UTC', now()),
	data json NOT NULL DEFAULT '{}'::json,
	CONSTRAINT sessions_pkey PRIMARY KEY (id),
	CONSTRAINT sessions_owner_fkey FOREIGN KEY (owner) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
) WITH (OIDS = FALSE);
CREATE INDEX sessions_owner_idx ON sessions USING btree (owner);
CREATE INDEX sessions_ts_idx ON sessions USING btree (ts);

-- Set session ts
CREATE FUNCTION sessions_update_ts() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
	NEW.ts = timezone('UTC', now());
	RETURN NEW;
END;
$$;
CREATE TRIGGER sessions_update_ts_trigger BEFORE INSERT OR UPDATE ON sessions FOR EACH ROW EXECUTE PROCEDURE sessions_update_ts();

-- Clear old sessions
CREATE FUNCTION sessions_delete_old_rows() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
	DELETE FROM sessions WHERE ts < timezone('UTC', NOW() - (COALESCE((SELECT value->>0 FROM config WHERE key = 'sessionDuration' LIMIT 1)::integer,86400)::text||' seconds')::interval);
	RETURN NULL;
END;
$$;
CREATE TRIGGER sessions_delete_old_rows_trigger AFTER INSERT OR UPDATE ON sessions FOR EACH STATEMENT EXECUTE PROCEDURE sessions_delete_old_rows();

-- Models
CREATE TYPE models AS ENUM ('hotel', 'point', 'vehicle', 'trip', 'order');

-- Objects data store
CREATE TABLE objects (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	model models NOT NULL,
	enable boolean NOT NULL DEFAULT TRUE,
	owner uuid DEFAULT NULL,
	title text NOT NULL DEFAULT ''::text,
	data json NOT NULL DEFAULT '{}'::json,
	CONSTRAINT objects_pkey PRIMARY KEY (id),
	CONSTRAINT objects_owner_fkey FOREIGN KEY (owner) REFERENCES users (id) ON UPDATE CASCADE ON DELETE SET NULL
) WITH (OIDS = FALSE);
CREATE INDEX objects_model_idx ON objects USING btree (model);
CREATE INDEX objects_enable_idx ON objects USING btree (enable);
CREATE INDEX objects_owner_idx ON objects USING btree (owner);

-- Static data storage
CREATE TABLE static (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	enable boolean NOT NULL DEFAULT TRUE,
	owner uuid DEFAULT NULL,
	url varchar(80) NOT NULL,
	title text NOT NULL DEFAULT ''::text,
	description text NOT NULL DEFAULT ''::text,
	content text NOT NULL DEFAULT ''::text,
	image varchar(128) DEFAULT NULL,
	CONSTRAINT static_pkey PRIMARY KEY (id),
	CONSTRAINT static_owner_fkey FOREIGN KEY (owner) REFERENCES users (id) ON UPDATE CASCADE ON DELETE SET NULL
) WITH (OIDS = FALSE);
CREATE INDEX static_enable_idx ON static USING btree (enable);
CREATE INDEX static_owner_idx ON static USING btree (owner);
CREATE UNIQUE INDEX static_url_unique_idx ON static USING btree (url);

/*!
 * WEB API Claster master
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'
process.env.TZ = 'UTC'

const cluster = require('cluster')
const fs = require('fs')
const os = require('os')

if (!process.env.WORKER_ENGINE) {
	console.error(`ERROR: WORKER_ENGINE enveroment variable isn't set`)
	process.exit(1)
}

if (!process.env.WORKER_PORT) {
	console.error(`ERROR: WORKER_PORT enveroment variable isn't set`)
	process.exit(1)
}

cluster.setupMaster({
	exec: `./core/${process.env.WORKER_ENGINE}.js`,
	args: [process.env.WORKER_PORT],
	silent: true
})

let isStoping = false

const forkWorker = () => {
	if (isStoping)
		return

	let worker = cluster.fork()
	worker.process.stdout.pipe(process.stdout)
	worker.process.stderr.pipe(process.stderr)
}

const killTimeout = Number.parseInt(process.env.KILL_TIMEOUT || 60) * 1000

const stopWorker = worker => {
	console.log(`Master stopping ${worker.process.pid} worker...`)

	worker.disconnect()

	let killTimer = setTimeout(() => worker.kill(), killTimeout)
	killTimer.unref()
}

const stopAllWorkers = () =>
	Object.keys(cluster.workers).forEach(id => stopWorker(cluster.workers[id]))

cluster.on('online', worker => console.log(`Worker ${worker.process.pid} is online`))
cluster.on('disconnect', forkWorker)
cluster.on('exit', (worker, code, signal) =>
	console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`)
)

// The master will respond to SIGHUP, which will trigger
// restarting all the workers and reloading the app.
process.on('SIGHUP', () => {
	console.log('Restarting all workers...')
	stopAllWorkers()
})

// The master will respond to SIGTERM, which will trigger
// stoping all the workers and shutdown.
process.on('SIGTERM', () => {
	isStoping = true
	console.log('Stopping all workers...')
	stopAllWorkers()
})

// Write master PID to file
if (process.env.PID_FILE)
	fs.writeFileSync(process.env.PID_FILE, process.pid)

// Number of workers to be launched
const workerCount = Number.parseInt(process.env.WORKER_COUNT || os.cpus().length || 2)
console.log(`Master is online. Setting up ${workerCount} ${process.env.WORKER_ENGINE} workers...`)

for (let i = 0; i < workerCount; i++)
	forkWorker()

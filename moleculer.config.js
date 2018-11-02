'use strict';
require('dotenv').config();
const { extend } = require('moleculer').Logger;
const logger = require('./bin/logger');
const loggerConfig = require('./config/logger');
module.exports = {
	namespace: '',
	nodeID: process.env.HOSTNAME || null,

	logger: loggerConfig.local ? true : (bindings) => extend(logger(bindings)),
	logLevel: 'info',
	logFormatter: 'default',
	logObjectPrinter: null,
	transporter: {
		type: 'NATS',
		options: {
			url: process.env.NATS_HOST,
			user: process.env.NATS_USER,
			pass: process.env.NATS_PASS
		}
	},

	serializer: 'JSON',

	requestTimeout: 10 * 1000,
	retryPolicy: {
		enabled: false,
		retries: 5,
		delay: 100,
		maxDelay: 1000,
		factor: 2,
		check: (err) => err && !!err.retryable
	},

	maxCallLevel: 100,
	heartbeatInterval: 5,
	heartbeatTimeout: 15,

	tracking: {
		enabled: false,
		shutdownTimeout: 5000
	},

	disableBalancer: true,

	registry: {
		strategy: 'RoundRobin',
		preferLocal: true
	},

	circuitBreaker: {
		enabled: true,
		threshold: 0.5,
		windowTime: 60,
		minRequestCount: 20,
		halfOpenTime: 10 * 1000,
		check: (err) => err && err.code >= 500
	},

	bulkhead: {
		enabled: false,
		concurrency: 10,
		maxQueueSize: 100
	},

	validation: true,
	validator: null,

	metrics: false,
	metricsRate: 1,

	internalServices: true,
	internalMiddlewares: true,

	hotReload: false,

	// Register custom middlewares
	middlewares: [],

	// Called after broker created.
	created (broker) {

	},

	// Called after broker starte.
	started (broker) {

	},

	// Called after broker stopped.
	stopped (broker) {

	},

	replCommands: null
};

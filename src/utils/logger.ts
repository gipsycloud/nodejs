import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

const logger = pino({
    level: process.env.LOG_LEVEL ?? (
        isProduction ? "info" : "debug"
    ),
    base: {
        service : "training-support-api",
        environment: process.env.NODE_ENV ?? "development"
    },
    redact: {
        paths: [
            "req.headers.authorization",
            "req.headers.cookie",
            "res.headers.set-cookie"
        ],
        censor: "[REDACTED]"
    },
    transport:
        process.env.NODE_ENV !== 'production'
            ? {
                  target: 'pino-pretty',
                  options: {
                      colorize: true,
                      translateTime: 'SYS:standard',
                      ignore: 'pid,hostname',
                  },
              }
            : undefined,
});

export default logger;
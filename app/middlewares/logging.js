const winston = require('winston');
const { createLogger, transports } = require('winston');

const logger = createLogger({
    format: winston.format.json(),
    // defaultMeta: { service: 'employee-portal' },
    transports: [
        new transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new transports.Console({
            level: 'error',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })

    ]
});

const logRequests = (req, res, next) => {
    logger.info(`RequestURL : ${req.url}, params : ${JSON.stringify(req.params)},  Body  : ${JSON.stringify(req.body)} `);
    next();
}

const logResponse = (req, res, next) => {

    const oldWrite = res.write;
    const oldEnd = res.end;

    const chunks = [];

    res.write = (...restArgs) => {
        chunks.push(Buffer.from(restArgs[0]));
        oldWrite.apply(res, restArgs);
    };

    res.end = (...restArgs) => {
        if (restArgs[0]) {
            chunks.push(Buffer.from(restArgs[0]));
        }
        const body = Buffer.concat(chunks).toString('utf8');

        console.log({
            time: new Date().toUTCString(),
            fromIP: req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress,
            method: req.method,
            originalUri: req.originalUrl,
            uri: req.url,
            requestData: req.body,
            responseData: body,
            referer: req.headers.referer || '',
            ua: req.headers['user-agent']
        });
        oldEnd.apply(res, restArgs);
    };

    next();
}

module.exports = {
    logRequests, logResponse, logger
}
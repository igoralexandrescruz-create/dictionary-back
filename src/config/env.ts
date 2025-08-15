
export const env = {
    server: {
        port: +process.env.SERVER_PORT || 3000,
        reverseProxy: process.env.REVERSE_PROXY === 'true',
        prefix: process.env.SERVER_PREFIX || 'api',
        url: process.env.SERVER_URL || 'localhost',
        debug: process.env.DEBUG === 'true',
        info: {
            version: process.env.VERSION || '1.0',
            protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
        },
    },
    security: {
        jwt: {
            jwtSecret: process.env.JWT_SECRET,
            jwtExpiresIn: +process.env.JWT_EXPIRES_IN || 600,
        },
        hash: {
            rounds: parseInt(process.env.HASH_ROUNDS, 10) || 12,
        }
    },
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        username: process.env.DATABASE_USERNAME || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        database: process.env.DATABASE_NAME || 'nexa',
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        username: process.env.REDIS_USERNAME || '',
        password: process.env.REDIS_PASSWORD || '',
        db: parseInt(process.env.REDIS_DB, 10) || 0,
    }
};

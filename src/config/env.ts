
export const env = {
    server: {
        port: +process.env.SERVER_PORT || 3000,
        reverseProxy: process.env.REVERSE_PROXY === 'true',
        prefix: process.env.SERVER_PREFIX || 'api/v1',
        url: process.env.SERVER_URL || 'localhost',
        debug: process.env.DEBUG === 'true',
        info: {
            version: process.env.VERSION || '1.0',
            protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
        },
    },
};

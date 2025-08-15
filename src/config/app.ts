import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import { json, urlencoded } from 'express';
import express from 'express';
import { AppModule } from 'src/modules/app.module';
import helmet from 'helmet';
import { env } from './env';
import { join } from 'path';
import { configSwagger } from './swagger';

export const configApp = async (): Promise<INestApplication> => {
    const app = await NestFactory.create(AppModule);
    app.use(cors());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );
    app.use(json({ limit: '1mb' }));
    app.setGlobalPrefix(env.server.prefix);
    app.use(helmet());
    configSwagger(app);

    // Serve static files from /public folder
    app.use('/', express.static(join(process.cwd(), 'public')));

    return app;
};
import { DocumentBuilder } from "@nestjs/swagger";
import { env } from "src/config/env";

export const swaggerBase = (version: string): DocumentBuilder => {
    const basePath = `${env.server.info.protocol}://${env.server.url}${env.server.reverseProxy ? '' : ':' + String(env.server.port)}/`;
    return new DocumentBuilder()
        .addSecurity('bearer', {
            type: 'http',
            scheme: 'bearer',
        })
        .setContact(
            'Igor Santos',
            'https://github.com/igoralexandrescruz-create',
            'igor.alexandre.s.cruz@gmail.com',
        )
        .addBearerAuth()
        .setTitle(`Dictionary API ${version}`)
        .setVersion(version)
        .addServer(basePath)
        .setDescription('Documentação da Dictionary API')
}
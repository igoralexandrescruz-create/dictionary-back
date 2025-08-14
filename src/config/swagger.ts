import { INestApplication } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { env } from "./env";
import { swaggerBase } from "src/utils/swagger/base-config";

export const configSwagger = (app: INestApplication) => {
    const docsV1 = SwaggerModule.createDocument(
        app,
        swaggerBase('1.0', `${env.server.prefix}`).build(),
        {
            ignoreGlobalPrefix: true,
            include: []
        });


    SwaggerModule.setup('docs', app, docsV1);
};


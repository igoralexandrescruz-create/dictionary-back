import { env } from "./env";
import { swaggerBase } from "src/utils/swagger/base-config";
import { AuthModule } from "src/modules/auth/auth.module";
import { INestApplication } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";

export const configSwagger = (app: INestApplication) => {
    const docsV1 = SwaggerModule.createDocument(
        app,
        swaggerBase('1.0').build(),
        {
            ignoreGlobalPrefix: true,
            include: [
                AuthModule
            ]
        });


    SwaggerModule.setup('docs', app, docsV1);
};


import { swaggerBase } from "src/modules/_shared/utils/swagger/base-config";
import { AuthModule } from "src/modules/auth/auth.module";
import { INestApplication } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { SharedModule } from "src/modules/_shared/shared.module";

export const configSwagger = (app: INestApplication) => {
    const docsV1 = SwaggerModule.createDocument(
        app,
        swaggerBase('1.0').build(),
        {
            ignoreGlobalPrefix: true,
            include: [
                SharedModule,
                AuthModule,
            ]
        });


    SwaggerModule.setup('docs', app, docsV1);
};


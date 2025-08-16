import { DynamicModule, Global, Module } from "@nestjs/common";
import { FetchAdapter } from "./fetch.adapter";
import { SHARED_PORT_TOKENS } from "src/modules/_shared/application/ports/tokens";

@Global()
@Module({})
export class HttpModule {
    static register(): DynamicModule {
        return {
            module: HttpModule,
            providers: [
                {
                    provide: SHARED_PORT_TOKENS.HTTP,
                    useFactory: () => {
                        return FetchAdapter.getInstance();
                    },
                    inject: [],
                },
            ],
            exports: [SHARED_PORT_TOKENS.HTTP],
        }
    }
}
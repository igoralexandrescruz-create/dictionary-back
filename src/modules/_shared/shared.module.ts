import { Module } from "@nestjs/common";
import { FullstackChallangeController } from "./presentation/http/controllers/fullstack-challange.controller";

@Module({
    controllers: [FullstackChallangeController],
})
export class SharedModule { }
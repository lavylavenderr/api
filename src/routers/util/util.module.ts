import { Module } from "@nestjs/common";
import { UtilityController } from "./util.controller";

@Module({
    controllers: [UtilityController],
})
export class RandomModule {}
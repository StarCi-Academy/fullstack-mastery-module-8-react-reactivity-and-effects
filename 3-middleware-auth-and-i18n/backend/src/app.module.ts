import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"

/**
 * AppModule — only the AuthController stub used by the middleware verify call.
 */
@Module({
    controllers: [AuthController],
})
export class AppModule {}

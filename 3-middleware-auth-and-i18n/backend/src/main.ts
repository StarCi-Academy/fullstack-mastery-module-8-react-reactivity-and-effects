import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

/**
 * Bootstrap NestJS — bật CORS để Next.js middleware (server-side) gọi được.
 * (EN: Bootstrap NestJS — enable CORS so Next.js middleware (server-side) can call.)
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    app.enableCors({ origin: "http://localhost:3001", credentials: true })
    await app.listen(3000)
}

void bootstrap()

import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

/**
 * Bootstrap NestJS — enable CORS so Next.js middleware (server-side) can call.
 * Reads PORT + FRONTEND_ORIGIN from env to support port collision retry.
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    const origin = process.env.FRONTEND_ORIGIN ?? "http://localhost:3001"
    app.enableCors({ origin, credentials: true })
    const port = Number(process.env.PORT ?? 3000)
    await app.listen(port)
}

void bootstrap()

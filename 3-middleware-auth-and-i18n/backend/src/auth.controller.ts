import { Body, Controller, HttpCode, Post } from "@nestjs/common"

type VerifyDto = { token?: string }

/**
 * AuthController stub — chỉ chấp nhận token === "valid-token".
 * (EN: AuthController stub — accepts only token === "valid-token".)
 *
 * Production: thay bằng JWT/session verify thật.
 * (EN: In production replace with real JWT/session verification.)
 */
@Controller("auth")
export class AuthController {
    @Post("verify-session")
    @HttpCode(200)
    verify(@Body() body: VerifyDto): { valid: boolean; userId: string | null } {
        const valid = body?.token === "valid-token"
        return { valid, userId: valid ? "user-1" : null }
    }
}

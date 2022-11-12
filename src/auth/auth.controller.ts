import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    // dependency injection
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup() {
        return 'Signup successfully'
    }

    @Post('signin')
    signin() {
        return 'Signin successfully'
    }
}
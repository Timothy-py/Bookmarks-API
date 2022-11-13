import  { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service"
import { AuthDto } from "./dto";

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService){}

    // signup logic
    signup(dto: AuthDto) {
        return 'Signup successfully'
    }

    // login logic
    login() {
        return 'Signin successfully'
    }
}
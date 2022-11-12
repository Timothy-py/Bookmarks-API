import  { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService){}
    // login logic
    login() {
        return 'Signin successfully'
    }

    // signup logic
    signup() {
        return 'Signup successfully'
    }
}
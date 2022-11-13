import  { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2"
import { PrismaService } from "../prisma/prisma.service"
import { AuthDto } from "./dto";

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService){}

    // signup logic
    async signup(dto: AuthDto) {
        try {
            // hash the password
            const hash = await argon.hash(dto.password)

            // create user
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash
                }
            })

            return user
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken');
                    
                }
            }

            throw error;
        }
    }

    // login logic
    login() {
        return 'Signin successfully'
    }
}
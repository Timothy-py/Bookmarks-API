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
    async signin(dto: AuthDto) {
        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });
        // if user does not exist, throw an exception
        if(!user) throw new ForbiddenException('Incorrect credentials')

        // compare password
        const passwordMatch = await argon.verify(user.hash, dto.password)

        // if password is Incorrect
        if(!passwordMatch) throw new ForbiddenException('Incorrect credentials')

        // send user
        delete user.hash
        return user;
    }
}
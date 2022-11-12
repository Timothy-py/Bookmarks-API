import  { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
    // login logic
    login() {
        return 'Signin successfully'
    }

    // signup logic
    signup() {
        return 'Signup successfully'
    }
}
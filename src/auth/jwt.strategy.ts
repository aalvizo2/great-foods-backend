import { Injectable } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import { User } from "./schemas/auth.schema";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'my-secret'
        });
    }

    async validate(payload: any): Promise<User>{
        
        return {
            //@ts-expect-error
            Id: payload.Id,
            Username: payload.Username,
            Email: payload.Email,
            Name: payload.Name,
            PaternalSurname: payload.PaternalSurname,
            MaternalSurname: payload.MaternalSurname,
            PhoneNumber: payload.PhoneNumber,
            FullAddress: payload.FullAddress,
        }
    }
}
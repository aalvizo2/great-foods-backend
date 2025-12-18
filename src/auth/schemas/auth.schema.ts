import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument} from "mongoose";


export type UserSchema= HydratedDocument<User>
@Schema()

export class User{
    @Prop()
    Username: string;

    @Prop()
    Password: string;

    @Prop()
    Email: string;

    @Prop()
    Name: string;

    @Prop()
    PaternalSurname: string;

    @Prop()
    MaternalSurname: string;

    @Prop()
    Age: number;

    @Prop()
    PhoneNumber: number;

    @Prop()
    FullAddress: string;
    
}


export const UserSchema= SchemaFactory.createForClass(User);


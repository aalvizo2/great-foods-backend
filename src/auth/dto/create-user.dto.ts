import {IsEmail, IsNumber, IsString, MaxLength} from 'class-validator';

export class CreateUserDto{
    @IsString()
    @MaxLength(100)
    Username: string;

    @IsString()
    @MaxLength(20)
    Password: string;

    @IsString()
    @MaxLength(120)
    @IsEmail()
    Email: string;

    @IsString()
    @MaxLength(50)
    Name: string;

    @IsString()
    @MaxLength(50)
    PaternalSurname: string;

    @IsString()
    @MaxLength(50)
    MaternalSurname: string;

    @IsNumber()
    @MaxLength(15)
    PhoneNumber: string;

    @IsString()
    @MaxLength(200)
    FullAddress: string;
}
import { IsArray, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateRestaurantDto {
    @IsString()
    @MaxLength(100)
    RestaurantName: string;

    @IsString()
    @MaxLength(500)
    RestaurantDescription: string;

    @IsNumber()
    @MaxLength(10)
    TotalTables: number;

    @IsNumber()
    @MaxLength(10)
    AvailableTables: number;

    @IsNumber()
    @MaxLength(1)
    Rating: number;

    Suscription: boolean;

    @IsArray()
    Images: {
        Path: string;
        Extension: string;
    }[];
}

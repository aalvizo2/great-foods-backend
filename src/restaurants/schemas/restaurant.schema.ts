import{
    Prop,
    Schema, 
    SchemaFactory
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';



//We'll create a type so we can export as an schema 
export type RestaurantSchema = HydratedDocument<Restaurant>
@Schema()


export class Restaurant{
    @Prop()
    RestaurantName: string;
    
    @Prop()
    RestaurantDescription: string;
    
    @Prop()
    TotalTables: number;

    @Prop()
    AvailableTables: number;

    @Prop()
    Rating: number;

    @Prop()
    Suscription: boolean;

    @Prop()
    Images: [
        {
            Path: string;
            Extension: string;
        }
    ]

}


export const RestaurantSchema= SchemaFactory.createForClass(Restaurant);
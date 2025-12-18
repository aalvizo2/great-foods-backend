import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema} from './schemas/restaurant.schema';
import { MinioModule } from 'src/minio/minio/minio.module';

@Module({
  imports: [
    MinioModule,
    MongooseModule.forFeature([{
      name: Restaurant.name,
      schema: RestaurantSchema
    }]),
  
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],

  
})
export class RestaurantsModule {}

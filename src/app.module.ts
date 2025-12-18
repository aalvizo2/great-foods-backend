import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './auth/jwt.strategy';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MinioService } from './minio/minio/minio.service';
import { MinioModule } from './minio/minio/minio.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AuthModule,
    RestaurantsModule,
    MinioModule, 
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, MinioService] 
})
export class AppModule {}
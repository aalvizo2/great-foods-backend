import { Module } from '@nestjs/common';
import { User, UserSchema } from './schemas/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt'

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'my-secret',
      signOptions: {expiresIn: '1d'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [MongooseModule, AuthService] 
})
export class AuthModule {}

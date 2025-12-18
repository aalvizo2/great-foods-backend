// auth.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service'; 
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('User')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    
  ) {}

  @Post('Login')
  @ApiOperation({
    summary: 'Login into the app'
  })
  @ApiBody({
    type: LoginDto,
    examples: {
      basic: {
        summary: 'Inicia Sesión',
        value: {
          Username: 'example@example.com',
          Password: 'Password'
        }
      },
      full:{
        summary: 'Inicia Sesión',
        value: {
          Username: 'example@example.com',
          Password: 'Password'
        }
      }
    }
  })
  async login(
    @Body()
    loginDto: LoginDto
  ){
    return this.authService.login(loginDto)
  }


  @Post()
  @ApiOperation({summary: 'Register a new user'})
  @ApiBody({ 
    type: CreateUserDto,
    examples: {
      basic: {
        summary: 'Registro básico',
        value: {
          Username: 'maria_garcia',
          Password: "securePass123!",
          Email: "maria.garcia@example.com",
          Name: "María",
          PaternalSurname: "García",
          MaternalSurname: "López",
          Age: 30,
          PhoneNumber: 5512345678,
          FullAddress: "Av. Siempre Viva 742, Springfield"
        }
      },
      full: {
        summary: 'Registro completo',
        value: {
          Username: 'maria_garcia',
          Password: "securePass123!",
          Email: "maria.garcia@example.com",
          Name: "María",
          PaternalSurname: "García",
          MaternalSurname: "López",
          Age: 30,
          PhoneNumber: 5512345678,
          FullAddress: "Av. Siempre Viva 742, Springfield"
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully registered'
  })
  @ApiResponse({
    status: 401,
    description: 'Bad Request'
  })
  async register(@Body() createUserDTO: CreateUserDto){
    return this.authService.createUser(createUserDTO);
  }


  @Get()
  @ApiOperation({summary: 'Gets all Users'})
  @ApiResponse({
    status: 200
  })
  async findAllUsers(){
    return this.authService.findAllUsers();
  }



  
  

}

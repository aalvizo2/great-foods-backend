// auth.service.ts
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/auth.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ){}

  async createUser(createUserDto: CreateUserDto): Promise<User>{
    const existingUser= await this.userModel.findOne({
      $or: [
        { Username: createUserDto.Username },
        { Email: createUserDto.Email }
      ]});

    if(existingUser){
       throw new HttpException('This username already exists', HttpStatus.CONFLICT);
    }

    
    
    //Encriptamos la contraseña 
    const hashedPassword= await bcrypt.hash(createUserDto.Password,  10);

    //Reemplazamos la contraseña hasheada
    createUserDto.Password = hashedPassword;

    //Creamos el usuario pero ahora con la contraseña hasheada
    const createdUser= new this.userModel(createUserDto);
    //Retornamos los valores y guardamos 
    return createdUser.save();
  }
  
  async findAllUsers(): Promise<User[]>{
    const data= await this.userModel.find();
    const users= data.map((item) => {
      const {_id, __v, ...rest}= item.toObject()
      return{
        Id: item._id.toString(),
        ...rest 
      }
    });
    
    return users;
  }


  async login(
    loginDto: LoginDto
  ){
    //Checamos que si exista el usuario dentro de la base de datos
    const user= await this.userModel.findOne({Username: loginDto.Username});
    //En caso de no encontrar ningun usuario retornamos un error 
    if(!user){
      return new HttpException('Username not found', HttpStatus.NOT_FOUND);
    }
    //Comprobamos que la contraseña este correcta 
    const isCorrectPassword= await bcrypt.compare(loginDto.Password, user.Password);
    //Si la contraseña es incorrecta pintamos un error 
    if(!isCorrectPassword){
      throw new HttpException('Incorrect Password',  HttpStatus.UNAUTHORIZED);
    }
    //Generamos el payload de los datos que va a retornar el token
    const payload={
      
      Id: user.id,
      Username: user.Username,
      Email: user.Email,
      PaternalSurname: user.PaternalSurname,
      MaternalSurname: user.MaternalSurname,
      PhoneNumber: user.PhoneNumber,
      FullAddress: user.FullAddress,
    };
    
    //generamos el token
    const token= this.jwtService.sign(payload);
    //Retornamos los valores en caso de sesión exitosa 
    return {
       token: token,
       
    };
  }
  


  
  
}



import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';


@Injectable()
export class RestaurantsService {
  //we'll create a constructor to bring up restaurant model 
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>
  ){}


  async create(createRestaurantDto: CreateRestaurantDto) {
    const existingRestaurant= await this.restaurantModel.findOne({
      $or: [
        {
          RestaurantName: createRestaurantDto.RestaurantName
        }
      ]
    })
    if(existingRestaurant){
      throw new HttpException('This Restaurant is already registered', HttpStatus.CONFLICT);
    }
    const newData= new this.restaurantModel(createRestaurantDto);
    newData.save();
    return {
      Status: 200,
      Message: 'Operation succesfully made',
      
    };
  }

  async findAll() {
    const data= await this.restaurantModel.find();
    const Data= data.map(item=>{
      const{_id, __v, ...rest}= item.toObject();
      return{
        Id: item._id.toString(),
        ...rest
      }
    })
    return Data;
  }

  async findOne(id: string) {
    console.log('id que se esta ingresando', id);
    const data = await this.restaurantModel.findById(id);

    
    
    if (!data) {
      throw new HttpException('No se ha encontrado un Id', HttpStatus.BAD_REQUEST);
    }
    

    const {_id, __v, ...rest}= data.toObject();
    const Data={
      Id: _id,
      ...rest
    }
    
    
    return Data;
  }
  

  async update(id: string, updateRestaurantDto: CreateRestaurantDto) {
    const data = await this.restaurantModel.findByIdAndUpdate(
      id,                      // <-- solo el string del ID
      updateRestaurantDto,     // <-- el DTO con los datos a actualizar
      { new: true }            // <-- para que retorne el documento actualizado
    );
  
    if (!data) {
      throw new HttpException('Restaurante no encontrado', HttpStatus.NOT_FOUND);
    }
  
    return {
      Id: data._id,
      ...data.toObject()
    };
  }
  
  async remove(id: string) {
    console.log(id, 'id que se va a consumir')
    const data= await this.restaurantModel.findOne({
      _id: id,
      Suscription: false
      
    });
    console.log('datos recuperados', data)
    return {
      Status: 200,
      Message: 'Operación realizada con éxito',
      data
    };
  }
}

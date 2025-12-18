import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import {FileInterceptor} from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MinioService } from 'src/minio/minio/minio.service';


@Controller('Restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly minioService: MinioService
  ) { }

  // @Post()
  // @ApiConsumes('multipart/form-data')
  // @ApiOperation({
  //   summary: 'register a new restaurant'
  // })
  // @ApiBody({
  //   type: CreateRestaurantDto,
  //   examples: {
  //     basic: {
  //       summary: 'Registra un restaurante',
  //       value: {
  //         RestaurantName: 'La fonda ',
  //         RestaurantDescription: 'Comida Mexicana y antojitos',
  //         TotalTables: 3,
  //         AvailableTables: 3,
  //         Rating: 5,
  //         Suscription: true

  //       }
  //     },
  //     full: {
  //       summary: 'Registra un restaurante',
  //       value: {
  //         RestaurantName: 'La fonda ',
  //         RestaurantDescription: 'Comida Mexicana y antojitos',
  //         TotalTables: 3,
  //         AvailableTables: 3,
  //         Rating: 5,
  //         Suscription: true

  //       }
  //     }
  //   }
  // })
  // @UseInterceptors(FileInterceptor('image'))
  // create(
  //   @UploadedFile() file: File,
  //   @Body() createRestaurantDto: CreateRestaurantDto
  // ) {
  //   return this.restaurantsService.create(createRestaurantDto);
  // }
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Register a new restaurant with image' })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       RestaurantName: { type: 'string' },
  //       RestaurantDescription: { type: 'string' },
  //       TotalTables: { type: 'integer' },
  //       AvailableTables: { type: 'integer' },
  //       Rating: { type: 'number' },
  //       Suscription: { type: 'boolean' },
  //       image: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  @ApiBody({
  schema: {
    type: 'object',
    properties: {
      RestaurantName: { type: 'string' },
      RestaurantDescription: { type: 'string' },
      TotalTables: { type: 'number' },
      AvailableTables: { type: 'number' },
      Rating: { type: 'number' },
      Suscription: { type: 'boolean' },
      image: { type: 'string', format: 'binary' }, // 👈 esto activa el campo de imagen en Swagger
    },
  },
})
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createRestaurantDto: CreateRestaurantDto,
  ) {
    const imageUploadResult = await this.minioService.uploadImage(file);

    // Puedes guardar la ruta en el DTO o directamente en la entidad
    const dtoWithImage = {
      ...createRestaurantDto,
      imagePath: imageUploadResult.path,
    };

    return this.restaurantsService.create(dtoWithImage);
  }

  @ApiOperation({
    summary: 'View all restaurants list'
  })
  @ApiResponse({
    status: 200
  })
  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }
  

  @Get(':id')
  @ApiOperation({
    summary: 'Find a restaurant by Id'
  })
  @ApiResponse({
    status: 200
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(id);
  }
  

  @ApiOperation({
    summary: 'update selected restaurant'
  })
  @ApiBody({
    type: CreateRestaurantDto,
    examples: {
      basic: {
        summary: 'Registra un restaurante',
        value: {
          RestaurantName: 'La fonda ',
          RestaurantDescription: 'Comida Mexicana y antojitos',
          TotalTables: 3,
          AvailableTables: 3,
          Rating: 5,
          Suscription: true

        }
      },
      full: {
        summary: 'Registra un restaurante',
        value: {
          RestaurantName: 'La fonda ',
          RestaurantDescription: 'Comida Mexicana y antojitos',
          TotalTables: 3,
          AvailableTables: 3,
          Rating: 5,
          Suscription: true

        }
      }
    }
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(id);
  }
}

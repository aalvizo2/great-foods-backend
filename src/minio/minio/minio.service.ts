import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { Express } from 'express'; // <-- Import correcto del tipo de archivo

@Injectable()
export class MinioService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: 'us-east-1',
      endpoint: 'http://localhost:9000',
      credentials: {
        accessKeyId: 'myminioadmin',
        secretAccessKey: 'my-secret-minio',
      },
      forcePathStyle: true, // necesario para MinIO
    });
  }

  async uploadImage(file: Express.Multer.File, folder = 'restaurant') {
    try {
      const extension = file.originalname.split('.').pop();
      const filename = `${folder}/${uuid()}.${extension}`; // <-- Corrige el nombre del archivo

      const command = new PutObjectCommand({
        Bucket: 'restaurants',
        Key: filename,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);

      return {
        status: 200,
        message: 'Operación realizada con éxito',
        path: filename,
      };
    } catch (error) {
      console.error('Error al subir imagen a MinIO:', error);
      throw new InternalServerErrorException('No se pudo subir la imagen.');
    }
  }
}

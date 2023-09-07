import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FotosModule } from 'fotos/fotos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express/multer';
import { GoogleDriveModule } from 'nestjs-google-drive';
import { diskStorage } from 'multer';

@Module({
  imports: [ MongooseModule.forRoot('mongodb+srv://astroupv:457r0n0m14UpV@astroupv.yhek4as.mongodb.net/db'), 
  FotosModule, MulterModule.register({
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        callback(null, file.fieldname + ".png");
  }})
  }),  
  GoogleDriveModule.register({
    clientId: '1065593827550-ccob5i35qskbeln7hmunmu9d15kp13p1.apps.googleusercontent.com',
    clientSecret: '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',
    redirectUrl: 'https://developers.google.com/oauthplayground',
    refreshToken: '1//04DApDcEkDpp6CgYIARAAGAQSNwF-L9IrVIeG3YUPiC49Dn3LZx_h5M7Ii7uUCNmTIhqz2M5b_qzrEQGnIoF1y7CJ_QJZyqx0kXM',
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

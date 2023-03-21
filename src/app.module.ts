import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { UploadFilesModule } from './upload-files/upload-files.module';
import { ImagesModule } from './images/images.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const options = await getConnectionOptions();
        return {
          ...options,
        } as TypeOrmModuleOptions;
      },
    }),
    UsersModule,
    MailModule,
    AuthModule,
    UploadFilesModule,
    ImagesModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AppModule {}

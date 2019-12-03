import { Module } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { AuthModule } from '../auth/auth.module';
import { passportModule } from '../passport.module';
import { PicturesController } from './pictures.controller';
import { PicturesRepository } from './pictures.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    passportModule,
    TypeOrmModule.forFeature([PicturesRepository]),
    AuthModule,
  ],
  controllers: [PicturesController],
  providers: [PicturesService],
})
export class PicturesModule {}

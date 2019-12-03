import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuid } from 'uuid';
import { diskStorage } from 'multer';
import * as path from 'path'
import * as fs from 'fs';

@Controller('/pictures')
export class PicturesController {
  constructor(private service: PicturesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './uploads/pictures',
        filename: (req, file, cb) => {
          let extension;
          switch (file.mimetype) {
            case 'image/jpeg':
              extension = 'jpg';
              break;
            default:
              throw new Error('Invalid extension');
          }
          return cb(null, `${uuid()}.${extension}`)
        }
      })
    }
  )
  )
  uploadFile(@UploadedFile() file) {
    return this.service.createPicture(file.filename);
  }

  @Get('/:name')
  async servePicture(@Param('name') name, @Res() res): Promise<any> {
    const resolvedPath = path.resolve(`./uploads/pictures/${name}.jpg`);
    if (fs.existsSync(resolvedPath)) {
      res.sendFile(resolvedPath);
    } else {
      res.status(404).sendFile('not-found.jpg', { root: 'assets/' });
    }
  }
}

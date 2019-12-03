import {
  Injectable,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from 'winston';
import { PicturesRepository } from './pictures.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Picture } from './picture.entity';


@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(PicturesRepository)
    private repository: PicturesRepository,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  /**
   * Gets a specific picture.
   * @param {string} id - The id of the picture.
   */
  getPictureById = async (id: string): Promise<Picture> => {
    const entity = await this.repository.findOne(id);

    if (!entity)
      throw new NotFoundException(`Picture with ID ${id} not found`);
    return entity;
  };


  createPicture = async (fileName: string) => {
    const picture = new Picture();    
    picture.id = fileName.split('.')[0];
    picture.filename = fileName;
    await picture.save();
    this.logger.info(`Picture ${picture.filename} uploaded.`);
    return picture;
  }
}

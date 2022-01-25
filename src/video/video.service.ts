import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Video from './entities/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideoService {
  constructor(@InjectRepository(Video) private videoRepo: Repository<Video>) {}

  async create(file, createVideoDto: CreateVideoDto) {
    const video = new Video();
    video.fileType = file.mimetype || file.type;
    video.fileSize = file.size;
    video.url = '/' + file.path;
    if (createVideoDto) {
      const title = createVideoDto.title;
      const description = createVideoDto.description;
      if (title) video.title = title;
      if (description) video.description = description;
    }
    const videoPersist = await this.videoRepo.save(video);
    return videoPersist;
  }

  async findAll() {
    return await this.videoRepo.find({
      order: {
        fileSize: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    return await this.videoRepo.findOne(id);
  }

  /**
  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }

   **/
}

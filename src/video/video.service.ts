import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Video from './entities/video.entity';
import { Repository } from 'typeorm';
import { Util } from '../shared/utils/util';
import { NotFoundException } from '../shared/exception/not-found.exception';
import * as fs from 'fs';
import { promisify } from 'util';
const unlinkAsync = promisify(fs.unlink);
import * as path from 'path';

@Injectable()
export class VideoService {
  constructor(@InjectRepository(Video) private videoRepo: Repository<Video>) {}

  async create(file, createVideoDto: CreateVideoDto) {
    try {
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
    } catch (e) {
      Util.throwError(e);
    }
  }

  async findAll(sort = 'ASC') {
    try {
      const videos = await this.videoRepo.find({
        order: {
          fileSize: sort && sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
        },
      });
      if (!videos || videos.length <= 0) {
        throw new NotFoundException('Not Found Any Videos');
      }
      return videos;
    } catch (e) {
      Util.throwError(e);
    }
  }

  async findOne(id: number) {
    try {
      const video = await this.videoRepo.findOne(id);
      if (!video) {
        throw new NotFoundException('Not Found Video');
      }
      return video;
    } catch (e) {
      Util.throwError(e);
    }
  }

  async remove(id: number) {
    try {
      const v = await this.findOne(id);
      const filePath = path.join(__dirname, '..', '..', v.url);
      await unlinkAsync(filePath);
      const video = await this.videoRepo.remove(v);
      return video;
    } catch (e) {
      Util.throwError(e);
    }
  }
}

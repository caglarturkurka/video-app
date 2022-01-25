import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import {ApiConsumes, ApiQuery} from '@nestjs/swagger';

const videoStorageOptions = diskStorage({
  destination: './upload/videos',
  filename: (req, file, callback) => {
    callback(null, `avatar-${Date.now()}-${file.originalname}`);
  },
});

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: videoStorageOptions,
      limits: { fileSize: +5000000 },
      fileFilter: (req: Request, file, cb) => {
        const mimeType = file.mimetype;
        if (!mimeType.includes('video')) {
          return cb(new Error('Extension not allowed'), false); // FileIntercepter is completely ignoring this.
        }
        return cb(null, true);
      },
    }),
  )
  create(@UploadedFile() file, @Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(file, createVideoDto);
  }

  @ApiQuery({
    name: 'sort',
    required: false,
  })
  @Get()
  findAll(@Query('sort') sort: string) {
    return this.videoService.findAll(sort);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }

  /**
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }

   **/
}

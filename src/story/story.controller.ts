import { Body, Controller, Get, Post, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { validateSync } from 'class-validator';
import { StoryService } from './story.service';
import { CreateStoryDTO } from './dto/create-story.dto';
import { GetStoriesDTO } from './dto/get-stories.dto';

@ApiTags('Story')
@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('create')
  @ApiBody({ type: CreateStoryDTO,
    examples:
      { default:
        { summary: 'Example Story',
        value:
          { title: '어쩌다 Nest',
            author: '어쩌다',
            image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            validTime: 24,
            hashtags: ['#어쩌다', '#Nest', '#당근']
          }
        }
      }
  })
  createStory(@Body() body: CreateStoryDTO): any {
    const errors = validateSync(body);
    if (errors.length > 0) {
      throw new HttpException('요청 바디의 값이 유효하지 않습니다.', HttpStatus.BAD_REQUEST);
    }
    return this.storyService.createStory(body);
  }

  @Get('list')
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  listStories(@Query() query: GetStoriesDTO): any {
    const errors = validateSync(query);
    if (errors.length > 0) {
      throw new HttpException('요청 쿼리의 값이 유효하지 않습니다.', HttpStatus.BAD_REQUEST);
    }
    return this.storyService.getStories(query);
  }
}
import { Injectable } from '@nestjs/common';
import { CreateStoryDTO } from './dto/create-story.dto';
import { GetStoriesDTO } from './dto/get-stories.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './story.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
  ) {}


  async createStory(createStoryDto: CreateStoryDTO): Promise<Story> {
    const { title, author, image, hashtags, validTime } = createStoryDto;
    const uniqueHashtags = Array.from(new Set(hashtags.map(tag => tag.toLowerCase())));
    const story = this.storyRepository.create({
      validTime,
      title,
      author,
      image,
      hashtags: uniqueHashtags,
    });
    return await this.storyRepository.save(story);
  }

  async getStories(query: GetStoriesDTO): Promise<{ data: Story[]; page: number; totalPage: number; limit: number }> {
    const { page, limit } = query;
    const [result, total] = await this.storyRepository
      .createQueryBuilder('story')
      .where('TIMESTAMPDIFF(HOUR, story.createdAt, NOW()) <= story.validTime')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: result,
      page,
      totalPage: Math.ceil(total / limit),
      limit,
    };
  }
}

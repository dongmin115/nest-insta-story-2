import { IsNotEmpty, IsString, IsNumber, Matches, IsUrl, IsArray } from 'class-validator';

export class CreateStoryDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  validTime: 12 | 24;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Matches(/^#.+$/, { each: true })
  hashtags: string[];
}
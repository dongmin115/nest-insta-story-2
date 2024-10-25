import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetStoriesDTO {
  @IsNotEmpty()
  @IsNumber()
  page: number;

  @IsNotEmpty()
  @IsNumber()
  limit: number;
}

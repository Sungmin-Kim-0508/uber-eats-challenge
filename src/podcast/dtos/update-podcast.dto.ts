import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Episode } from '../entities/episode.entity';

@InputType()
export class UpdatePodcastDto {
  @Field(type => String)
  @IsString()
  readonly title?: string;

  @Field(type => String)
  @IsString()
  readonly category?: string;

  @Field(type => Number)
  @IsNumber()
  readonly rating?: number;

  readonly episodes?: Episode[];
}

import { Field, ObjectType } from '@nestjs/graphql';
import { Episode } from './episode.entity';

@ObjectType()
export class Podcast {
  @Field(type => Number)
  id: number;

  @Field(type => String)
  title: string;

  @Field(type => String)
  category: string;

  @Field(type => Number)
  rating: number;

  @Field(type => [Episode])
  episodes: Episode[];
}

@ObjectType()
export class PodcastType {
  @Field(type => [Podcast])
  podcasts: Podcast[] | null;

  @Field(type => String)
  err: string | null;
}

@ObjectType()
export class CreatePodcastType {
  @Field(type => Number)
  id: number;

  @Field(type => String!)
  err: string | null;
}

@ObjectType()
export class SinglePodcastType {
  @Field(type => Podcast)
  podcast: Podcast;

  @Field(type => String!)
  err: string | null;
}

@ObjectType()
export class ErrorType {
  @Field(type => String!)
  err: string | null;
}

import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Episode {
  @Field(type => Number)
  id: number;

  @Field(type => String)
  title: string;

  @Field(type => String)
  category: string;

  @Field(type => Number)
  rating: number;
}

@ObjectType()
export class EpisodeType {
  @Field(type => [Episode])
  episodes: Episode[];

  @Field(type => String!)
  err: string | null;
}

@ObjectType()
export class CreateEpisodeType {
  @Field(type => Number!)
  episdoeId: number | null;

  @Field(type => String!)
  err: string | null;
}

@ObjectType()
export class EpisodeErrorType {
  err: string | null
}
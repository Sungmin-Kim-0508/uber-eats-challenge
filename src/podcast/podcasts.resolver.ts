import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreatePodcastType, ErrorType, Podcast, PodcastType, SinglePodcastType } from "./entities/podcast.entity";
import { PodcastsService } from "./podcasts.service";
import { CreatePodcastDto } from "./dtos/create-podcast.dto"
import { UpdatePodcastDto } from "./dtos/update-podcast.dto";
import { CreateEpisodeType, EpisodeErrorType, EpisodeType } from "./entities/episode.entity";
import { CreateEpisodeDto } from "./dtos/create-episode.dto";
import { UpdateEpisodeDto } from "./dtos/update-episode.dto";

@Resolver(of => Podcast)
export class PodcastResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query(returns => PodcastType)
  getAllPodcasts(): PodcastType {
    return this.podcastsService.getAllPodcasts()
  }

  @Mutation(returns => CreatePodcastType)
  createPodcast(@Args('createPodcastDto') createPodcastDto: CreatePodcastDto): CreatePodcastType {
    return this.podcastsService.createPodcast(createPodcastDto)
  }

  @Query(returns => SinglePodcastType)
  getPodcast(@Args('id') id: string): SinglePodcastType {
    return this.podcastsService.getPodcast(id);
  }

  @Mutation(returns => ErrorType)
  updatePodcast(
    @Args('id') id: string,
    @Args('updatePodcastDto') updatePodcastDto: UpdatePodcastDto
  ): ErrorType {
    return this.podcastsService.updatePodcast(id, updatePodcastDto);
  }

  @Mutation(returns => ErrorType)
  deletePodcast(@Args('id') id: string): ErrorType {
    return this.podcastsService.deletePodcast(id);
  }
}

@Resolver()
export class EpisodeResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query(returns => EpisodeType)
  getEpisodes(@Args('id') id: string): EpisodeType {
    return this.podcastsService.getEpisodes(id)
  }

  @Mutation(returns => CreateEpisodeType)
  createEpisode(
    @Args('id') podcastId: string,
    @Args('createEpisodeDto') createEpisodeDto: CreateEpisodeDto
  ) {
    return this.podcastsService.createEpisode(podcastId, createEpisodeDto);
  }

  @Mutation(returns => EpisodeErrorType)
  updateEpisode(
    @Args('id') podcastId: string,
    @Args('episodeId') episodeId: string,
    @Args() updateEpisodeDto: UpdateEpisodeDto,
  ): EpisodeErrorType {
    return this.podcastsService.updateEpisode(
      podcastId,
      episodeId,
      updateEpisodeDto,
    );
  }

  @Mutation(returns => EpisodeErrorType)
  deleteEpisode(
    @Args('id') podcastId: string,
    @Args('episodeId') episodeId: string,
  ): EpisodeErrorType {
    return this.podcastsService.deleteEpisode(podcastId, episodeId);
  }
}
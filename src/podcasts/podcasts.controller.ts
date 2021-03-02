import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';

@Controller('podcasts')
export class PodcastsController {
	constructor(private readonly podcastsService: PodcastsService) { }
	@Get()
	getAllPodcasts() {
		return this.podcastsService.getAll()
	}

	@Post()
	createPodcast(@Body() podcastData) {
		return this.podcastsService.createPodcast(podcastData)
	}

	@Get(":id")
	getSinglePodcast(@Param("id") podcastId: string) {
		return this.podcastsService.getPodcastById(podcastId)
	}

	@Patch(":id")
	updatePodcast(@Param("id") podcastId: string, @Body() podcastData) {
		return this.podcastsService.updatePodcast(podcastId, podcastData)
	}

	@Delete(":id")
	deleteSinglePodcast(@Param("id") podcastId: string) {
		return this.podcastsService.deletePodcast(podcastId)
	}

	@Get(":id/episodes")
	getEpisodes(@Param("id") podcastId: string) {
		return this.podcastsService.getAllEpisodes(podcastId)
	}

	@Post(":id/episodes")
	createEpisodes(@Param("id") podcastId: string, @Body() episodeData) {
		return this.podcastsService.createEpisodes(podcastId, episodeData)
	}

	@Patch(":id/episodes/:episodeId")
	updateEpisode(@Param("id") podcastId: string, @Param("episodeId") episodeId: string, @Body() episodeData) {
		return this.podcastsService.updateEpisode(podcastId, episodeId, episodeData)
	}

	@Delete(":id/episodes/:episodeId")
	deleteEpisode(@Param("id") podcastId: string, @Param("episodeId") episodeId: string) {
		return this.podcastsService.deleteEpisode(podcastId, episodeId)
	}
}

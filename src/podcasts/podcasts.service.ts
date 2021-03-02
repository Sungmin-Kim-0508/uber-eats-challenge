import { Injectable, NotFoundException } from '@nestjs/common';
import { podcasts } from 'src/data/podcasts';
import { Podcast } from 'src/entities/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = podcasts

  getAll() {
    return this.podcasts
  }

  createPodcast(podcastData) {
    this.podcasts.push({
      id: (this.podcasts.length + 1).toString(),
      ...podcastData
    })
  }

  getPodcastById(podcastId: string) {
    const podcast = this.podcasts.find(podcast => podcastId === podcast.id)
    if (!podcast) {
      throw new NotFoundException(`Podcast with ID: ${podcastId} not found.`);
    }
    return podcast
  }

  updatePodcast(podcastId: string, podcastData) {
    const podcast = this.getPodcastById(podcastId)
    this.deletePodcast(podcastId)
    this.podcasts.push({ ...podcast, ...podcastData })
    return true
  }

  deletePodcast(podcastId: string): boolean {
    this.podcasts = this.podcasts.filter(podcast => podcastId !== podcast.id)
    return true
  }

  getAllEpisodes(podcastId: string) {
    const podcast = this.getPodcastById(podcastId)
    return podcast.episodes
  }

  getEpisodeById(episodeId: string, podcastData: Podcast) {
    const episode = podcastData.episodes.find(episode => episode.id === episodeId)
    if (!episode) {
      throw new NotFoundException(`Episode with ID: ${episodeId} not found.`);
    }
    return episode
  }

  createEpisodes(podcastId: string, episodeData) {
    const podcast = this.getPodcastById(podcastId)
    podcast.episodes.push({
      id: (podcast.episodes.length + 1).toString(),
      ...episodeData
    })
    return this.podcasts
  }

  updateEpisode(podcastId: string, episodeId: string, episodeData) {
    this.deleteEpisode(podcastId, episodeId)
    const podcast = this.getPodcastById(podcastId)
    podcast.episodes.push({ id: episodeId, ...episodeData })
    return this.podcasts
  }

  deleteEpisode(podcastId: string, episodeId: string): boolean {
    const podcast = this.getPodcastById(podcastId)
    podcast.episodes = podcast.episodes.filter(episode => episode.id !== episodeId)
    return true
  }
}

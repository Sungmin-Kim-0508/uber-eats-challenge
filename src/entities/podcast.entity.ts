import { Episode } from "./episode.entity";

export class Podcast {
  id: string;
  title: string;
  category: string;
  rating:number;
  episodes: Episode[]
}
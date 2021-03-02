import { Podcast } from "src/entities/podcast.entity";

export const podcasts: Podcast[] = [
  {
    id: "1",
    title: "Mental Training",
    category: "mentality",
    rating: 4,
    episodes: [
      {
        id: "123",
        title: "Listen to your voice in your mind",
        content: "bla-bla-bla-bla-bla-bla-bla-bla-bla-bla",
        createdAt: new Date()
      }
    ]
  }
]
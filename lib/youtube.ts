import { google } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY as string,
});

export async function getLatestYouTubeVideos(channelId: string, maxResults: number = 9) {
  const response = await youtube.search.list({
    channelId,
    part: ['snippet'],
    order: 'date',
    type: ['video'],
    maxResults,
  } as any);

  return response.data.items?.map(item => ({
    id: item.id?.videoId,
    title: item.snippet?.title,
    description: item.snippet?.description,
    thumbnail: item.snippet?.thumbnails?.high?.url,
    publishedAt: item.snippet?.publishedAt,
  })) || [];
}

export type YouTubeVideo = Awaited<ReturnType<typeof getLatestYouTubeVideos>>[number];
import { getPosts } from "@/api";
import { getEvents } from "@/api/get-events";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.freethecitizens.org/";

  try {
    const [posts, events] = await Promise.all([
      getPosts().catch((error) => {
        console.error("Error fetching posts:", error);
        return null;
      }),
      getEvents().catch((error) => {
        console.error("Error fetching events:", error);
        return null;
      }),
    ]);

    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/gallery`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
    ];

    const postEntries: MetadataRoute.Sitemap = posts
      ? posts.map((post) => ({
          url: `${baseUrl}/posts/${post.id}`,
          lastModified: new Date(post.updated_at),
          changeFrequency: "weekly",
          priority: 0.7,
        }))
      : [];

    const eventEntries: MetadataRoute.Sitemap = events
      ? events.map((event) => ({
          url: `${baseUrl}/events/${event.id}`,
          lastModified: new Date(event.updated_at),
          changeFrequency: "weekly",
          priority: 0.6,
        }))
      : [];

    return [...staticPages, ...postEntries, ...eventEntries];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}

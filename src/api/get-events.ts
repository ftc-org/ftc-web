import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TEvent } from "@/types";
import { BASE_API_URL } from "@/constants";
import { cache } from "react";

export const getEvents = cache(
  async (isLive?: boolean): Promise<TEvent[] | undefined> => {
    try {
      let endpoint = `${BASE_API_URL}/events`;

      if (isLive) {
        endpoint += `?is_live=true`;
      }

      const response = await axios.get(endpoint);

      if (isLive && response.data.results.length === 0) {
        const fallbackResponse = await axios.get(`${BASE_API_URL}/events`);
        return fallbackResponse.data.results;
      }

      return response.data.results;
    } catch (error) {
      console.error("Failed to fetch events:", error);
      return;
    }
  }
);

export async function getRelatedEvents(
  id: number
): Promise<TEvent[] | undefined> {
  try {
    const endpoint = `${BASE_API_URL}/events/${id}/related`;

    const response = await axios.get(endpoint);

    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return;
  }
}

export async function getEventById(id: string): Promise<TEvent | undefined> {
  try {
    const endpoint = `${BASE_API_URL}/events/${id}`;

    const response = await axios.get(endpoint);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return;
  }
}

export function useGetEvents({ isLive }: { isLive?: boolean }) {
  const results = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(isLive),
  });

  return {
    ...results,
    events: results.data,
  };
}

export function useGetRelatedEvents({ id }: { id?: number }) {
  const results = useQuery({
    queryKey: ["events/related"],
    queryFn: () => getRelatedEvents(id!),
  });

  return {
    ...results,
    events: results.data,
  };
}

export function useGetEvent({ id }: { id?: string }) {
  const results = useQuery({
    queryKey: [`events/${id}`],
    queryFn: () => getEventById(id!),
  });

  return results;
}

import { getEventById, getEvents } from "@/api/get-events";
import { EventDetailsPage } from "@/app/components/event-details";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};
async function EventPage(props: Props) {
  const event = await getEventById(props.params.id);

  if (!event) {
    return notFound();
  }
  return <EventDetailsPage event={event} />;
}

export const dynamic = "auto";

export async function generateStaticParams() {
  const allEvents = await getEvents();

  if (!allEvents || allEvents.length === 0) {
    return [{ id: "1" }, { id: "2" }];
  }

  return allEvents?.map((event) => ({
    id: event.id.toString(),
  }));
}

export default EventPage;

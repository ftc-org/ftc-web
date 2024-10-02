import { getEvents } from "@/api/get-events";
import { EventDetailsPage } from "@/app/components/event-details";

type Props = {
  params: {
    id: string;
  };
};
async function EventPage(props: Props) {
  return <EventDetailsPage eventId={props.params.id.toString()} />;
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

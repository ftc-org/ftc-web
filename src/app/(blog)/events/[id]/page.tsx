import { getEventById } from "@/api/get-events";
import { notFound } from "next/navigation";
import { EventDetailsPage } from "./components/event-details";

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

export default EventPage;
import { useRouteLoaderData, redirect } from "react-router";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  const data = useRouteLoaderData("event-detail");

  return (
    <>
      <EventItem event={data.event} />
    </>
  );
};

export default EventDetailPage;

export const loader = async ({ request, params }) => {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Could not fetch details for selected events.",
      }),
      {
        status: 500,
      },
    );
  } else {
    return response;
  }
};

export const action = async ({ params,request }) => {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/"+eventId,{
    // method:'DELETE',
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not delete event" }), {
      status: 500,
    });
  }

  return redirect('/events')
};

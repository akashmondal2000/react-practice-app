import { Suspense } from "react";
import { useRouteLoaderData, redirect, Await } from "react-router";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{textAlign:"center"}}>Loading Details....</p>}>
        <Await resolve={event}>
          {(loadEvent) => <EventItem event={loadEvent} />}
        </Await>
      </Suspense>

      <Suspense fallback={<p style={{textAlign:"center"}}>Loading list.....</p>}>
        <Await resolve={events}>
          {(loadEvents) => <EventsList events={loadEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

/*This function for event details*/
const loadEvent = async (id) => {
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
    const resData = await response.json();
    return resData.event;
  }
};

/* this function for event list*/
const loadEvents = async () => {
  const responce = await fetch("http://localhost:8080/events");

  if (!responce.ok) {
    // return {isError:true , message: "Could not fetch events"} "ex.1"
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });

    // return json({message:'Could not fetch events.'},{status:500})
    /* json() is a function that creates a responce object that includes data in the json format */
  } else {
    const resDeta = await responce.json();
    return resDeta.events;
  }
};

export const loader = async ({ request, params }) => {
  const id = params.eventId;

  return {
    event: await loadEvent(id),
    events: loadEvents(),
  };
};

export const action = async ({ params, request }) => {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    // method:'DELETE',
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not delete event" }), {
      status: 500,
    });
  }

  return redirect("/events");
};

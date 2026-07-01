import { useLoaderData } from "react-router";
import EventsList from "../components/EventsList.jsx";

const EventsPage = () => {
  const events = useLoaderData();
  return (
    <>
      <EventsList events={events} />
    </>
  );
};

export default EventsPage;

export const loader = async () => {
  const responce = await fetch("http://localhost:8080/events");

  if (!responce.ok) {
    //.....
  } else {
    const resData = await responce.json();
    return resData.events;
  }
};

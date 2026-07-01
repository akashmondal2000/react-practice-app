import { Link } from "react-router";
import { useEffect, useState } from "react";
import EventsList from "../components/EventsList.jsx";

const DUMMY_EVENTS = [
  { id: "e1", title: "Event Detail 1" },
  { id: "e2", title: "Event Detail 2" },
];

const EventsPage = () => {
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError ] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {

      setIsLoading(true);
      const responce = await fetch("http://localhost:8080/events");

      if (!responce.ok){
        setError('Fetching events faild.')
      }else{
        const resData = await responce.json();
        setFetchedEvents(resData.events);
      }
      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <>
      <h1>Events Page</h1>

      <div style={{ textAlign: "center" }}>
        {isLoading && <p>Loading....</p>  }
        { error && <p>{error}</p> }
      </div>
      <EventsList events={fetchedEvents} />
    </>
  );
};

export default EventsPage;

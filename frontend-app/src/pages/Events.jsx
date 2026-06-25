import { Link } from "react-router";

const DUMMY_EVENTS = [
  { id: "e1", title: "Event Detail 1" },
  { id: "e2", title: "Event Detail 2" },
];

const EventsPage = () => {
  return (
    <>
      <h1>Events Page</h1>
      <ul>
        {DUMMY_EVENTS.map((eventItem) => (
          <li key={eventItem.id}>
            <Link to={eventItem.id}>{eventItem.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EventsPage;

import { Outlet } from "react-router"; 
import EventsNavigation from "../components/EventsNavigation";

const EventsRootsLayout = () => {
  return (
    <>
        <EventsNavigation/>
        <Outlet/>
    </>
  )
}

export default EventsRootsLayout
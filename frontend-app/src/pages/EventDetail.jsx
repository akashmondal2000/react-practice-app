import { useParams } from "react-router";




const EventDetailPage = () => {
  const params = useParams();
  return (
    <>
      <h1>This is Event Details page</h1>

      <h3>Event id: {params.eventId}</h3>
    </>
  )
}

export default EventDetailPage
import { redirect } from 'react-router'
import EventForm from "../components/EventForm";

const NewEventPage = () => {
  return <EventForm />;
};

export default NewEventPage;

export const action = async ({ request, params }) => {

  /*Extract all form data*/ 
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  /* send request to the backend*/ 
  const responce = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (!responce.ok) {
    throw new Response(
      JSON.stringify({
        message: "Could not save events.",
      }),
      {
        status: 500,
      },
    );
  }

  return redirect('/events');
};

import { useLoaderData } from "react-router";
import EventsList from "../components/EventsList.jsx";

const EventsPage = () => {
  const data = useLoaderData();

  // ex.1 if(data.isError){
  //   return <p>{data.message}</p>
  // }
  const events = data.events;
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
    // return {isError:true , message: "Could not fetch events"} "ex.1"
    throw new Response(JSON.stringify({message:'Could not fetch events.'}),{
      status:500,
    })

    // return json({message:'Could not fetch events.'},{status:500})
    /* json() is a function that creates a responce object that includes data in the json format */
  } else {
    return responce;
  }
};

/* 
  In the Browser we can create a new responce object ex."const res = new Responce()"
  which i will name "res" hare by instantiating the built-in responce constructor
  function.
  Now this is built into the browser, this is a morden Browser feature,
  we can built our own responses. 

  And what's really importent to understand at this point is that this loader code will 
  not executed on a server. This is still all happening in the browser hare even though 
  it's not a component it's still in the browser, this is still client-side code.  


  const res = new Response(); ==> Now this "Responce()" constructor also takes any data
  of your choice as a first argument 
  ex. const res = new Response("any data");
  and then we can configure it with greater detail with help of an extra object then
  can be set as a second argument
  ex. const res = new Response("any data",{
      status:200
    });
  return res;

  Now whenever you return such a responce in your loaders the "react router" packge
  will automatically extract the data from your responce when using "useLoaderData"
  so the data return by "useLoaderData" will still be the responce data that was 
  part of the responce you returnd in your loader. 
*/

/*
  this "fetch("http://localhost:8080/events");" fetch function actually returns a promise 
  that resolves to a responce.
  Now combained with "React Routers" Support for these response object and it's autometic
  data extraction that simply means that you can, in the end take that "responce"
  which you get "const responce = await fetch("http://localhost:8080/events");" hare
  so this responce object, and return that in our loader.
  we non't need to mannualy extract data from the responce 
  ex. 
      export const loader = async () => {
      const responce = await fetch("http://localhost:8080/events");

      if (!responce.ok) {
        //.....
      } else {
        const resData = await responce.json();
        return resData;
      }
    };

Instead we can returned our responce like this 
ex.
    export const loader = async () => {
      const responce = await fetch("http://localhost:8080/events");

      if (!responce.ok) {
        //.....
      } else {
        return responce;
      }
    };


with or without checking weather it's ok 

hare "const events = useLoaderData();" this "useLoaderData" wll then autometically 
give us the data that's part of the response  
      
*/

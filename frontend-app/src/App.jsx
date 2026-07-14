import { createBrowserRouter, RouterProvider } from "react-router";


import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";

import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction
} from "./pages/EventDetail";

import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventsRootsLayout from "./pages/EventsRoots";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import RootLayout from "./pages/Root";
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, {action as newsletterAction}  from "./pages/Newsletter";


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/", // with the '/' only is called absolute path
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> }, // this is called index route

        // hare i will remove "/" for creating there "reletive" path

        {
          path: "events",
          element: <EventsRootsLayout />,
          // hare i will create nested roots
          children: [
            {
              index: true,
              element: <EventsPage />,
              loader: eventsLoader,
            },
            {
              path: ":eventId",
              id:"event-detail",
              loader: eventDetailLoader,
              children:[
                {
                  index:true,
                  element: <EventDetailPage />,
                  action : deleteEventAction
                },
                { path: "edit", element: <EditEventPage /> , action:manipulateEventAction },
              ]
            },
            { path: "new", element: <NewEventPage /> , action:manipulateEventAction },
          ],
        },
        /* News letter routs */
        {
          path:"newsletter",
          element:<NewsletterPage/>,
          action: newsletterAction
        } 
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

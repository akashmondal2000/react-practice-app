import { createBrowserRouter, RouterProvider } from "react-router";
import EventsRootsLayout from "./pages/EventsRoots";
import HomePage from "./pages/Home";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction
} from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import { action as manipulateEventAction } from './components/EventForm';

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

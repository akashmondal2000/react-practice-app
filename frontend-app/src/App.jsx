import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./pages/Root";
import EventsRootsLayout from "./pages/EventsRoots";
import HomePage from "./pages/Home";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventDetailPage from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/", // with the '/' only is called absolute path
      element: <RootLayout />,
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
            { path: ":eventId", element: <EventDetailPage /> },
            { path: "new", element: <NewEventPage /> },
            { path: ":eventId/edit", element: <EditEventPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

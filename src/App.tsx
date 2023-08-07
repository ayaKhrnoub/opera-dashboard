import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import {
  Dashboard,
  Parties,
  Reservation,
  Login,
  Home,
  NotFound,
  News,
  Users,
  AddParty,
  AllReservation,
  AddNews,
  Contact,
  Theater,
  AddTheater,
} from "./pages";
import { PersistLogin } from "./components";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="parties" element={<Parties />} />
          <Route path="parties/add" element={<AddParty />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="reservation/all" element={<AllReservation />} />
          <Route path="users" element={<Users />} />
          <Route path="archives" element={<Reservation />} />
          <Route path="news" element={<News />} />
          <Route path="news/add" element={<AddNews />} />
          <Route path="contact" element={<Contact />} />
          <Route path="theater" element={<Theater />} />
          <Route path="theater/add" element={<AddTheater />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} fallbackElement={<>loading...</>} />;
}

export default App;

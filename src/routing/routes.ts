import SearchFlight from "../views/SearchFlight";
import CheckIn from "../views/CheckIn";
import CheckInDone from "../views/CheckIn/CheckInDone";

export const AppRoutes = [
  {
    name: "SearchFlight",
    path: "/",
    component: SearchFlight,
    exact: true,
  },
  {
    name: "Check In",
    path: "/checkin",
    component: CheckIn,
    exact: true,
  },
  {
    name: "Check In Confirmed",
    path: "/done",
    component: CheckInDone,
    exact: true,
  },
];

import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Trips } from "./components/Trip/Trips";
import { Create } from "./components/Trip/Create";
import { Update } from "./components/Trip/Update";
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/Trips',
    element: <Trips />
  },
  {
    path: '/Create',
    element: <Create />
  },
  {
    path: '/Update/:id',
    element: <Update />,
    caseSensitive: false 
  },
];

export default AppRoutes;

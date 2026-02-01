import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

import StreamList from "./pages/StreamList";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import About from "./pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <StreamList /> },
      { path: "movies", element: <Movies /> },
      { path: "cart", element: <Cart /> },
      { path: "about", element: <About /> },
    ],
  },
]);

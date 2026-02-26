import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import StreamList from "./pages/StreamList";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import About from "./pages/About";
import MovieDetails from "./pages/MovieDetails";

import Login from "./pages/Login";
import Checkout from "./pages/Checkout";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      { index: true, element: <StreamList /> },
      { path: "movies", element: <Movies /> },
      { path: "movies/:id", element: <MovieDetails /> },
      { path: "about", element: <About /> },

      // auth
      { path: "login", element: <Login /> },

      // protected
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
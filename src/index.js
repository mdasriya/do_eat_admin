import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { RevenueProvider } from "./Context";
import Products from "./routes/Products";
import Home from "./routes/Home";
import Kundali from "./routes/Kundali";
import Navbar from "./components/Navbar";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import ContactData from "./routes/ContactData";
import Orders from "./routes/Orders";
import { Box } from "@chakra-ui/react";
import Users from "./routes/Users";
import Login from "./components/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import Yantra from "./routes/Yantra";
import WorkShip from "./routes/WorkShip";
import Aryuvedic from "./routes/Aryuvedic";


const AppLayout = () => (
  <>
    <Box display={"flex"}>
      <Box width={"15%"} >
        <Navbar />
      </Box>
      <Box width={"85%"}>
        <Outlet />
      </Box>
    </Box>
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <PrivateRoutes><Home /></PrivateRoutes> ,
      },
      // {
      //   path: "products",
      //   element: <PrivateRoutes><Products /></PrivateRoutes>,
      // },
      {
        path: "yantra",
        element: <PrivateRoutes><Yantra /></PrivateRoutes>,
      },
      // {
      //   path: "workShip",
      //   element: <PrivateRoutes><WorkShip /></PrivateRoutes>,
      // },
      // {
      //   path: "aryuvedic",
      //   element: <PrivateRoutes><Aryuvedic /></PrivateRoutes>,
      // },
      // {
      //   path: "kundalidata",
      //   element: <PrivateRoutes><Kundali /></PrivateRoutes>,
      // },
      // {
      //   path: "contactdata",
      //   element: <PrivateRoutes><ContactData /></PrivateRoutes>,
      // },
      {
        path: "orders",
        element: <PrivateRoutes><Orders /></PrivateRoutes>,
      },
      {
        path: "users",
        element: <PrivateRoutes><Users /></PrivateRoutes>,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <RevenueProvider>
      <RouterProvider router={router} />
    </RevenueProvider>
  </ChakraProvider>
);

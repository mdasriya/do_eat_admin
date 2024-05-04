import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  // {
  //   title: "Kundali Data",
  //   path: "/kundalidata",
  //   icon: <IoIcons.IoIosPaper />,
  //   cName: "nav-text",
  // },
  {
    title: "Products",
    path: "/products",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  
  // {
  //   title: "Contact Data",
  //   path: "/contactdata",
  //   icon: <IoIcons.IoMdPeople />,
  //   cName: "nav-text",
  // },
  {
    title: "Ordered Data",
    path: "/orders",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "All Users",
    path: "/users",
    icon: <FaIcons.FaUser />,
    cName: "nav-text",
  },
 
];

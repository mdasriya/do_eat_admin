import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const RevenueContext = createContext();

export const RevenueProvider = ({ children }) => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalYantra, setTotalYantra] = useState(0);
  const [totalgamestone, setTotalGemstone] = useState(0);
  const [totalWorkShip, setTotalWorkShip] = useState(0);
  const [totalAryuvedic, setTotalAryuvedic] = useState(0);
   const [navWidth, setNavWidth] = useState(false)

 


useEffect(()=> {

  // fetch Yantra code
  const fetchData = async () => {
    try {
      // Fetch order data
      const ordersResponse = await axios.get(
        "https://doeatsbackend.vercel.app/order/all"
      );

      // Update total orders
      setTotalOrders(ordersResponse.data.length);

      // Calculate total revenue
      const revenue = ordersResponse.data.reduce(
        (acc, data) => acc + data.price * data.quantity,
        0
      );

      // Update total revenue
      setTotalRevenue(revenue);

      // Fetch user data
      const usersResponse = await axios.get(
        "https://doeatsbackend.vercel.app/yantra"
      );
if(usersResponse.data){
 
   setTotalYantra(usersResponse.data.length)
}else{
  setTotalUsers(0)
}
  console.log("user", )
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
// fetch gamesStone code 

const yantaFetch = async () => {
  
  try {
    const response = await axios.get(
      "https://doeatsbackend.vercel.app/products"
    );
if(response.data){
   setTotalGemstone(response.data.length); 
}
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const WorkShipFetch = async () => {
  
  try {
    const response = await axios.get(
      "https://doeatsbackend.vercel.app/workShip"
    );
if(response.data){

   setTotalWorkShip(response.data.length); 
}
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const handleAryuvedic = async () => {
  
  try {
    const response = await axios.get(
      "https://doeatsbackend.vercel.app/medecine"
    );
if(response.data){

  setTotalAryuvedic(response.data.length); 
}
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
  fetchData();
  yantaFetch();
  WorkShipFetch()
  handleAryuvedic()
},[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch order data
        const ordersResponse = await axios.get(
          "https://doeatsbackend.vercel.app/order/all"
        );
console.log("orderData",ordersResponse.data)
        // Update total orders
        setTotalOrders(ordersResponse.data.length);

        // Calculate total revenue.
        const revenue = ordersResponse.data.reduce(
          (acc, data) => acc + data.price * data.quantity,
          0
        );

        // Update total revenue
        setTotalRevenue(revenue);

        // Fetch user data
        const usersResponse = await axios.get(
          "https://doeatsbackend.vercel.app/user"
        );
  if(usersResponse.data.users.length>0){
    setTotalUsers(usersResponse.data.users.length)
  }else{
    setTotalUsers(0)
  }
    console.log("user", )
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const updateTotalRevenue = (newTotalRevenue) => {
    setTotalRevenue(newTotalRevenue);
  };

  const updateTotalOrders = (newTotalOrders) => {
    setTotalOrders(newTotalOrders);
  };

  const updateTotalUsers = (newTotalUsers) => {
    setTotalUsers(newTotalUsers);
  };
  return (
    <RevenueContext.Provider
      value={{
        totalRevenue,
        updateTotalRevenue,
        totalOrders,
        updateTotalOrders,
        totalUsers,
        updateTotalUsers,
        totalYantra,
        totalAryuvedic,
        setNavWidth,
        totalgamestone,totalWorkShip
      }}
    >
      {children}
    </RevenueContext.Provider>
  );
};

export const useRevenue = () => {
  return useContext(RevenueContext);
};

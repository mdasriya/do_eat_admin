import React, { useEffect, useState } from "react";
import {
  Stat,
  StatNumber,
  StatHelpText,
  Card,
  CardBody,
  Box,
  Center,
  Heading,
  Grid,
  Text,
  Badge,
  Button,
} from "@chakra-ui/react";
import { BsCart4 } from "react-icons/bs";
import { useRevenue } from "../Context";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
function Home() {
  const [resLoading, setResLoading] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [update, setUpdate] = useState("")
  const [id, setId] = useState("")
  const { totalRevenue, totalOrders,totalWorkShip, totalUsers,totalYantra,totalgamestone,totalAryuvedic } = useRevenue();
// const resturant = false
 
 const render = () =>{
  setUpdate(prev => !prev)
 }



const handleResStatus = (props) => {
 setEditLoading(true)
console.log(props)
  axios.patch(`https://doeatsbackend.vercel.app/resturant/update/${id}`, {resturant:props} )
  .then((res)=> {
    // console.log(res.data)
    setEditLoading(false)
    render()
  }).catch((error)=> {
    console.log(error.message)
   setEditLoading(false)
  })


}

const fetch = () => {
  setResLoading(true)
  axios.get("https://doeatsbackend.vercel.app/resturant")
  .then((res)=> {
  // console.log(res.data)
  setStatus(res.data[0].resturant)
  setId(res.data[0]._id)
  setResLoading(false)
  }).catch((error)=> {
    console.log(error.message) 
     setResLoading(false)
  })
}


useEffect(()=>{
  fetch()
},[update])

// console.log("status", status)
console.log("id", resLoading)

  let allOders = totalgamestone + totalYantra + totalWorkShip + totalAryuvedic;
  return (
    <Box maxH={"100dvh"} overflow={"clip"}>
      <Center>
        <Text
         bgGradient='linear(to-l, #7928CA, #FF0080)'
         bgClip='text'
         fontSize={"2.5rem"}
          position={"relative"}
          top={"4rem"}
          fontWeight='extrabold'
        >
          Do Eat Admin DashBoard
        </Text>
        {resLoading ? <Button colorScheme="teal"  > Please wait...</Button> : status ? <Button colorScheme="green" disabled={editLoading===true} onClick={()=>handleResStatus(false)}> Resturant Open </Button> : <Button colorScheme="red" disabled={editLoading===true}  onClick={()=>handleResStatus(true)}> Resturant Close </Button>}
    {/* {status ?  <Button colorScheme="green"  onClick={()=>handleResStatus(false)}> Resturant Open </Button> :   <Button colorScheme="red"  onClick={()=>handleResStatus(true)}> Resturant Close </Button>}    */}
      </Center>
      <Grid
        templateColumns="repeat(2, 1fr)"
        padding={"10%"}
        gap={"30px"}
        overflow={"clip"}
      >
        <Card
          maxW="sm"
          p={10}
          _before={{
            content: `""`,
            borderRadius: "md",
            position: "absolute",
            top: "-8px",
            left: -2,
            // padding: 3,
            h: "100%",
            w: "100%",
            zIndex: -1,
            // bgColor: "#FFC789",
            backgroundImage:
              "radial-gradient(at left top, rgb(192, 132, 252), rgb(250, 204, 21))",
            transform: "rotate(-3deg)",
            opacity: 0.7,
          }}
        >
          <CardBody>
            <Heading size="md">Total Orders</Heading>
            <Stat>
              <StatNumber display={"flex"}>
                <BsCart4 fontSize={"2rem"} p={"5px"} />
                <Center></Center>
                <StatNumber> {totalOrders}</StatNumber>
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card
          maxW="sm"
          _before={{
            content: `""`,
            borderRadius: "md",
            position: "absolute",
            top: "-8px",
            left: -2,
            // padding: 3,
            h: "100%",
            w: "100%",
            zIndex: -1,
            // bgColor: "#FFC789",
            backgroundImage:
              "radial-gradient(at left top, rgb(192, 132, 252), rgb(250, 204, 21))",
            transform: "rotate(-3deg)",
            opacity: 0.7,
          }}
          p={10}
        >
          <CardBody>
            <Heading size="md">Total Revenue</Heading>

            <Stat>
              <StatNumber> ₹{totalRevenue}</StatNumber>
              <StatHelpText></StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card
          maxW="sm"
          _before={{
            content: `""`,
            borderRadius: "md",
            position: "absolute",
            top: "-8px",
            left: -2,
            // padding: 3,
            h: "100%",
            w: "100%",
            zIndex: -1,
            // bgColor: "#FFC789",
            backgroundImage:
              "radial-gradient(at left top, rgb(192, 132, 252), rgb(250, 204, 21))",
            transform: "rotate(-3deg)",
            opacity: 0.7,
          }}
          p={10}
        >
          <CardBody>
            <Heading size="md">Total Products</Heading>

            <Stat>
              <StatNumber display={"flex"}>
                <IoBagCheckOutline fontSize={"2rem"} p={"8px"} />{allOders}
              </StatNumber>
              <StatHelpText></StatHelpText>
            </Stat>
          </CardBody> 
        </Card>
        <Card
          maxW="sm"
          _before={{
            content: `""`,
            borderRadius: "md",
            position: "absolute",
            top: "-8px",
            left: -2,
            // padding: 3,
            h: "100%",
            w: "100%",
            zIndex: -1,
            // bgColor: "#FFC789",
            backgroundImage:
              "radial-gradient(at left top, rgb(192, 132, 252), rgb(250, 204, 21))",
            transform: "rotate(-3deg)",
            opacity: 0.7,
          }}
          p={10}
        >
          <CardBody>
            <Heading size="md"> Total Users</Heading>

            <Stat>
              <StatNumber display={"flex"}>
                <FaUsers fontSize={"2rem"} p={"8px"} mr={8} />
                <Text ml={2}>{totalUsers}</Text>
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  );
}

export default Home;

import React from "react";
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
} from "@chakra-ui/react";
import { BsCart4 } from "react-icons/bs";
import { useRevenue } from "../Context";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
function Home() {
  const { totalRevenue, totalOrders,totalWorkShip, totalUsers,totalYantra,totalgamestone,totalAryuvedic } = useRevenue();


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

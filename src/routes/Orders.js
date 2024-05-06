import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Badge,
  Button,
  useToast,
  useDisclosure,
  Text,
  Image,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useRevenue } from "../Context";
import { Spinner } from "@chakra-ui/react";

const Orders = () => {
  const toast = useToast();
  const [odata, setOdata] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [add, setAdd] = useState([]);
  const { updateTotalRevenue, updateTotalOrders } = useRevenue();
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const renderComp = () => {
    setRender((prev) => !prev);
  };

  //
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://light-foal-loafers.cyclic.app/order/all"
      );
      setOdata(response.data.reverse());
      console.log("res", response.data);
      setLoading(false);
      updateTotalOrders(response.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const fetchAdd = async () => {
    try {
      const response = await axios.get(
        "https://light-foal-loafers.cyclic.app/address"
      );
      setAdd(response.data);
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  };

  useEffect(() => {
    const revenue = odata.reduce((acc, data) => {
      return acc + data.price * data.quantity;
    }, 0);

    updateTotalRevenue(revenue);
  }, [odata, updateTotalRevenue]);

  // const filteredData = odata.filter((data) => {
  //   return (
  //     data.user.toLowerCase().includes(searchInput.toLowerCase()) ||
  //     data.title.includes(searchInput)
  //   );
  // });

  const handleEditOrderStatus = async (id, status) => {
    setLoadingStatus(true);
    if (status === "dispatch") {
      const response = await axios.patch(
        `https://light-foal-loafers.cyclic.app/order/update/${id}`,
        { status: "dispatch" }
      );
      try {
        if (response.data.state) {
          toast({
            title: response.data.msg,
            status: "success",
            position: "top-right",
            duration: 3000,
            isClosable: true,
          });
          setLoadingStatus(false);
          renderComp();
        }
      } catch (error) {
        toast({
          title: "something went wrong while order",
          status: "error",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
        setLoadingStatus(false);
        console.log(error.message);
      }
    } else {
      try {
        const response = await axios.patch(
          `https://light-foal-loafers.cyclic.app/order/update/${id}`,
          { status: "delivered" }
        );
        if (response.data.state) {
          toast({
            title: response.data.msg,
            status: "success",
            position: "top-right",
            duration: 3000,
            isClosable: true,
          });
          setLoadingStatus(false);
          renderComp();
        }
      } catch (error) {
        toast({
          title: "something went wrong while order",
          status: "success",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
        console.log(error.message);
        setLoadingStatus(false);
      }
    }
  };

const handleRefreshPage = () => {
  renderComp()
}


  useEffect(() => {
    fetchData();
    fetchAdd();
  }, [render]);

  console.log("odata", odata);

  return (
    <>
      <Box p={4} textAlign="center">
        <Heading mb={4}>Ordered Data</Heading>
        <Center>
          <InputGroup mb={4} width={"50%"}>
            <InputLeftElement pointerEvents="none">
              <Icon as={SearchIcon} color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search contact..."
              type="text"
              value={searchInput}
              onChange={handleSearch}
            />
          </InputGroup>
          <Button colorScheme="red" mt={"-20px"} ml={3} onClick={handleRefreshPage}>Refresh</Button>
        </Center>
        {loading ? (
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="orange.200"
              size="xl"
              position={"relative"}
              top={"10rem"}
            />
          </Center>
        ) : (
          <Box>
            {odata.map((item, index) => (
              <Box
                key={index}
               mb={5}
               border={"1px solid gray"}
                padding={3}
                width={"100%"}
              >
                <Box key={index} display={"flex"} gap={4}>
                  {/* address box start */}
                  <Box width={"40%"} height={"auto"} boxShadow={"md"} mb={5}>
                    <Text>OrderId: {item._id}</Text>
                    <Text>Order_Date: {item.orderDateTime.slice(0,10)}</Text>
                    <Text>
                      Full Name: {item.firstName} {item.lastName}
                    </Text>
                    <Text>Email: {item.email}</Text>
                    <Text>City: {item.city}</Text>
                    <Text>State: {item.state}</Text>
                    <Text>Country: {item.country}</Text>
                    <Text>Street: {item.street}</Text>
                  </Box>
                  {/* address box end */}
                  <Box
                    width={"60%"}
                    height={"auto"}
                    boxShadow={"md"}
                  >
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Image</Th>
                          {/* <Th>OrderId</Th> */}
                          <Th>title</Th>
                          <Th>Price</Th>
                          <Th>quantity</Th>
                          <Th>User</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {item.data.map((order, orderIndex) => (
                          <Tr>
                            <Td>
                              <Image
                                boxSize="50px"
                                objectFit="cover"
                                src={order.image}
                                alt={order.title}
                              />{" "}
                            </Td>
                            {/* <Td>{order._id}</Td> */}
                            <Td>{order.title}</Td>
                            <Td>{order.price}</Td>
                            <Td>{order.quantity}</Td>
                            <Td>{order.user}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Orders;

<!-- import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useRevenue } from "../Context";
import { Spinner } from "@chakra-ui/react";

const Orders = () => {
  const toast = useToast()
  const [odata, setOdata] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [add, setAdd] = useState([]);
  const { updateTotalRevenue, updateTotalOrders } = useRevenue();
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
const renderComp = () => {
  setRender((prev)=> !prev)
}

// 
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://doeatsbackend.vercel.app/order/all"
      );
      setOdata(response.data.reverse());
      console.log("res",response.data)
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
        "https://doeatsbackend.vercel.app/address"
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



  const handleEditOrderStatus = async(id, status) => {
    setLoadingStatus(true)
    if(status=== "dispatch"){
      const response =  await axios.patch(`https://doeatsbackend.vercel.app/order/update/${id}`, {status:"dispatch"})
      try {
        if(response.data.state){
          toast({
            title: response.data.msg,
            status: 'success',
            position:'top-right',
            duration: 3000,
            isClosable: true,
          })
          setLoadingStatus(false)
          renderComp()
         } 
      } catch (error) {
        toast({
          title: "something went wrong while order",
          status: 'error',
          position:'top-right',
          duration: 3000,
          isClosable: true,
        })
        setLoadingStatus(false)
        console.log(error.message)
      }


    }else{
      try {
        const response =  await axios.patch(`https://doeatsbackend.vercel.app/order/update/${id}`, {status:"delivered"})
        if(response.data.state){
          toast({
            title: response.data.msg,
            status: 'success',
            position:'top-right',
            duration: 3000,
            isClosable: true,
          })
          setLoadingStatus(false)
          renderComp()
         }
      } catch (error) {
        toast({
          title: "something went wrong while order",
          status: 'success',
          position:'top-right',
          duration: 3000,
          isClosable: true,
        })
        console.log(error.message)
          setLoadingStatus(false)
      }
    
    }
   
  }

  useEffect(() => {
    fetchData();
    fetchAdd();
  }, [render]);


console.log("odata", odata)

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
        <Table maxWidth={"500px"} variant="striped" colorScheme="orange" overflowX={"hidden"}    >
          <Thead>
            <Tr>
              
              <Th>Name</Th>
              <Th>OrderId</Th>
              <Th>Email</Th>
              <Th>Phone No.</Th>
              <Th>Order Date</Th>
            
              <Th>citys</Th>
              <Th>Country</Th>
              <Th>Order Status</Th>
              {/* <Th>Total Amount</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {odata.map((data, index) => {
              
              // const postData = add.find((code) => code.UserId === data.UserId);
              const orderData = data.data
               console.log("data.data",orderData)
              return (
                <Tr key={index}>
                
                <Td>{data.firstName} {data.lastName}</Td>
                <Td>{data.email}</Td>
                <Td>{data.phone}</Td>
                <Td>#{data._id}</Td>

                <Td>{data.orderDateTime.slice(0,10)}</Td>
                  <Td>{data.city}</Td>
                  <Td>{data.country}</Td>
                  
                 
                 
                  {/* <Td>
                    {addressData
                      ? `${addressData.address1},${addressData.address2},${addressData.city || " "},Mob.${addressData.phone}`
                      : "N/A"}
                  </Td> */}
                 
                  <Td>  <Box gap={2} display={"flex"} flexDirection={"column"}>
              <Box >
              {data.cancel === "process" ? <Badge  cursor={"pointer"} colorScheme={data.status === "delivered"?"teal":"purple"} >{data.status}</Badge>:<Badge  cursor={"pointer"} colorScheme='red'>{data.cancel}</Badge> }     
             {data.status === "delivered" && <Button mt={1} cursor={"pointer"} colorScheme='red' size='xs'>Order Closed</Button>}  
              
              </Box>
             
               <Button size='xs' isDisabled={data.status === "delivered" || data.status === "dispatch" ||data.cancel==="canceled"} cursor={"pointer"} colorScheme='blue' onClick={()=>handleEditOrderStatus(data._id, "dispatch")}>dispatch</Button>
                    <Button size='xs' isDisabled={data.status === "delivered" || data.cancel==="canceled"} cursor={"pointer"} colorScheme='green' onClick={()=>handleEditOrderStatus(data._id, "delivered")}>delivered</Button>
                    </Box></Td>
                  {/* <Td>{` ₹${data.price * data.quantity}`}</Td> */}
                 
                </Tr>
              
              );
            })}
          </Tbody>
        </Table>
      )}
    </Box>
    
                      </>
  );
};

export default Orders; -->

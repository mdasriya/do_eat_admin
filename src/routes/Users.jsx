import {
  Box,
  Center,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [initLoading, setInitLoading] = useState(false);

  const fetchData = async () => {
    setInitLoading(true);
    try {
      const response = await axios.get(
        "https://doeatsbackend.vercel.app/user"
      );
      console.log(response);
      if (response.data.users) setUsers((response.data.users).reverse());
      setInitLoading(false);
    } catch (error) {
      setInitLoading(false);
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(users);
  return (
    <Box p={2}>
      <Center>
        {" "}
        <Heading mb={4}>Users Data</Heading>
      </Center>

      {initLoading ? (
        <>
          {" "}
          <Center>
            <Spinner
              thickness="4px"
              emptyColor="gray.200"
              color="red.500"
              size="xl"
              position={"relative"}
              top={"16rem"}
            />
          </Center>
        </>
      ) : users.length <= 0 ? (
        <Center height={"80vh"}>
        {" "}
        <Text  fontSize={"20px"}>No User found</Text>
      </Center>
      ) : (
        <Table ml={"5px"} variant={"striped"} colorScheme="orange">
          <Thead>
            <Tr>
              <Th>Sr.No</Th>
              <Th>Registration Date</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user, index) => {
              return (
                <Tr key={index}>
                  <Td>{index+1}</Td>
                  <Td>{user.registrationDate.slice(0,10)}</Td>
                  <Td>{user.firstName}</Td>
                  <Td>{user.lastName}</Td>
                  <Td>{user.email}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Users;

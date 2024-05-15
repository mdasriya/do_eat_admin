import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
const ContactData = () => {
  const [loading, setLoading] = useState(true);

  const [cdata, setCdata] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://do-eat-backen.onrender.com/contact"
      );
      // console.log(data);

      setCdata(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };
  fetchData();
  const filteredData = cdata.filter((data) => {
    return (
      data.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      data.email.toLowerCase().includes(searchInput.toLowerCase()) ||
      data.subject.includes(searchInput) ||
      data.PhoneNo.toLowerCase().includes(searchInput.toLowerCase()) ||
      data.message.includes(searchInput)
    );
  });

  return (
    <Box p={4} textAlign="center">
      <Heading mb={4}>Contact & Remedies  Data</Heading>
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
        <Table variant="striped" colorScheme="orange">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone Number</Th>
              <Th>Subject</Th>
              <Th>Message</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.reverse().map((data, index) => (
              <Tr key={index}>
                <Td>{data.name}</Td>
                <Td>{data.email}</Td>
                <Td>{data.PhoneNo}</Td>
                <Td>{data.subject}</Td>
                <Td>{data.message}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default ContactData;

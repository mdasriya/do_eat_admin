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
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Center,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

const Kundali = () => {
  const [kdata, setKdata] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://doeatsbackend.vercel.app/kundali"
      );
      // console.log(data);
      const newData = response.data;
      setKdata((prevData) => [newData, ...prevData]);

      setKdata(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };
  fetchData();
  const filteredData = kdata.filter((data) => {
    return (
      data.fname?.toLowerCase().includes(searchInput.toLowerCase()) ||
      data.lname?.toLowerCase().includes(searchInput.toLowerCase()) ||
      data.dob?.includes(searchInput) ||
      data.pob?.toLowerCase().includes(searchInput.toLowerCase()) ||
      data.phone?.includes(searchInput)
    );
  });

  return (
    <Box p={4} textAlign="center">
      <Heading mb={4}>User Kundali Data</Heading>
      <Center>
        <InputGroup mb={4} width={"50%"}>
          <InputLeftElement pointerEvents="none">
            <Icon as={SearchIcon} color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search user..."
            value={searchInput}
            onChange={handleSearch}
          />
          <Button marginLeft={"20px"} colorScheme="twitter">
            {" "}
            Filter
          </Button>
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
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>DOB</Th>
              <Th>Hour</Th>
              <Th>Minutes</Th>
              <Th>Duration</Th>
              <Th>Place of Birth</Th>
              <Th>Phone Number</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.reverse().map((data, index) => (
              <Tr key={index}>
                <Td>{data.fname}</Td>
                <Td>{data.lname}</Td>
                <Td>{new Date(data.dob).toLocaleDateString()}</Td>
                <Td>{data.hours}</Td>
                <Td>{data.min}</Td>
                <Td>{data.selectedTime}</Td>
                <Td>{data.pob}</Td>
                <Td>{data.phone}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Kundali;

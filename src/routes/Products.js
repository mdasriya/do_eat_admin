 
import {
  chakra,
  Box,
  Stack,
  HStack,
  Container,
  Avatar,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Select,
  ModalFooter,
  Grid,
  AccordionIcon,
  Input,
  InputGroup,
  InputLeftElement,
  Center,
  Textarea,
  Text,
  Spinner,
} from "@chakra-ui/react";
// import data from "../Data";
import { UploadButton } from "@bytescale/upload-widget-react";
import { useState, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import BeatLoader from 'react-spinners/BeatLoader';
import axios from "axios";

import { useToast } from '@chakra-ui/react'
const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const [render, setRender] = useState(false)
  const [product, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(product);
  const [image, setImage] = useState("")

const textColor = localStorage.getItem("chakra-ui-color-mode")
  const options = {
    apiKey: "public_kW15bwHB6bQ5Wv42R9fgNg5vPtjH",
    maxFileCount: 1,
    showFinishButton: true,
   
  };


  const renderComp = () => {
    setRender((prev)=> !prev)
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        "https://light-foal-loafers.cyclic.app/products"
      );
 if(response.data){
  setIsLoading(false)
 }
      setProducts(response.data);
    } catch (error) {
      setIsLoading(false)
      console.error("Error fetching data:", error);
    }
  };
 
  const handleAddGemstoneClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setFormData({
      title: '',
      description: '',
      image: '',
      quantity: 0,
      benefits: '',
      qualities: [{ type: '', prices: [''] }],
    });
  };
 
  // const handleEditClick = (product) => {
  //   setEditingProduct(product);
  //   setIsModalOpen(true);
  // };
  const handleSaveEdit = async () => {
    try {
      if (editingProduct && editingProduct._id) {
        const res = await axios.put(
          `https://light-foal-loafers.cyclic.app/products/${editingProduct._id}`,
          editingProduct
        );
        fetchData();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    const filteredGemstones = product.filter((gemstone) =>
      gemstone.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredGemstones);
  }, [searchQuery, product]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://light-foal-loafers.cyclic.app/products/delete/${id}`);

      if (res.data.state) {
        renderComp();
        toast({
          title: 'Product deleted successfully!!',
          status: 'success',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error deleting product!!',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });
      console.error("Error deleting product:", error);
    }
  };





  // content goes here 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    quantity: 1,
    benefits: '',
    qualities: [{ type: '', prices: [''] }],
  });



  const handleChange = (event) => {
    const { name, value } = event.target;

     // If the name is "quantity," parse the value to an integer
  const parsedValue = name === "quantity" ? parseInt(value, 10) : value;

    setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
  };

  const handleQualityChange = (event, index) => {
    const { value } = event.target;
    setFormData((prevData) => {
      const newQualities = [...prevData.qualities];
      newQualities[index].type = value;
      return { ...prevData, qualities: newQualities };
    });
  };

  const handlePriceChange = (event, index, priceIndex) => {
    const { value } = event.target;

  // Parse the price value to an integer
  const parsedValue = parseInt(value, 10);

  setFormData((prevData) => {
    const newQualities = [...prevData.qualities];
    newQualities[index].prices[priceIndex] = isNaN(parsedValue) ? '' : parsedValue;
    return { ...prevData, qualities: newQualities };
  });
};
  

const handleSubmit = async () => {
  setAddLoading(true);

  // Parse quantity to ensure it's stored as a number
  const parsedQuantity = parseInt(formData.quantity, 10);

  // Update formData with the parsed quantity
  setFormData((prevData) => ({
    ...prevData,
    quantity: isNaN(parsedQuantity) ? '' : parsedQuantity,
  }));

  try {
    // Log or send the form data
    const res = await axios.post("https://light-foal-loafers.cyclic.app/products/create", formData);

    if (res.data.state) {
      toast({
        title: 'Product Added successfully!!',
        status: 'success',
        duration: 4000,
        position: 'top-right',
        isClosable: true,
      });

      setFormData({
        title: '',
        description: '',
        image: '',
        quantity: 1,
        benefits: '',
        qualities: [{ type: '', prices: [''] }],
      });

      renderComp();
      setAddLoading(false);
      setIsAddModalOpen(false);
    }
  } catch (error) {
    toast({
      title: 'Error during adding product',
      status: 'error',
      duration: 4000,
      position: 'top-right',
      isClosable: true,
    });

    console.log(error);
    setAddLoading(false);
  }
};





useEffect(() => {
  fetchData();
}, [render]);



  return (
    <Box>
      <chakra.h1 textAlign="center" fontSize="2xl" fontWeight="bold" mb={4}>
        Gemstone Products
      </chakra.h1>
    
      <Box>
        <InputGroup mb={4} mx="auto" maxW="md">
          <Input
            type="text"
            placeholder="Search for a product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
        <Center>
          {" "}
          <Button
            variant={"outline"}
            colorScheme={"green"}
            onClick={handleAddGemstoneClick}
          >
            Add Gemstone
          </Button>
        </Center>
      </Box>

      {/* isOpen={isAddModalOpen} onClose={handleCloseAddModal} */}
      <Modal size={"xl"} isOpen={isAddModalOpen} onClose={handleCloseAddModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Gemstone</ModalHeader>
          <ModalCloseButton />
         <ModalBody>
         <Box>
        
        <Box display={"flex"} gap={2}>
        <FormControl>
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" onChange={handleChange} value={formData.title} placeholder="product name"/>
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input type="text" name="image" onChange={handleChange} value={formData.image} placeholder="image address"/>
          </FormControl>
         {/* image uplaod code goes here   */}
          <Box className="container">
       <UploadButton options={options}
                onComplete={files => alert(files.map(x => x.fileUrl).join("\n"))}>
    {({onClick}) =>
      <Button mt={7} colorScheme="green" onClick={onClick}>
       Image Upload..
      </Button>
    }
  </UploadButton>
    </Box>
    
        </Box>
         

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" onChange={handleChange} value={formData.description} />
          </FormControl>

         

<FormControl mt={4}>
            <FormLabel>Quantity</FormLabel>
            <Input type="number" name="quantity" onChange={handleChange} value={formData.quantity} placeholder="product quantity"/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Benefits</FormLabel>
            <Textarea name="benefits" onChange={handleChange} value={formData.benefits} placeholder="eg.benefits1.benefits2.benefits3 "/>
          </FormControl>

         

          {/* Quality Schema Fields */}
          {formData.qualities.map((quality, index) => (
            <Box key={index} mt={4}>
              {/* Quality Type Field */}
              <FormControl>
                <FormLabel>Quality Type</FormLabel>
                <Input
                  type="text"
                  name={`qualityType${index}`}
                  onChange={(event) => handleQualityChange(event, index)}
                  value={quality.type}
                />
             {index===0 && <Text color={"green"}>PUT: I st Quality</Text>}   
             {index===1 && <Text color={"green"}>PUT: II nd Quality</Text>}   
             {index===2 && <Text color={"green"}>PUT: special Quality</Text>}   
             {index===3 && <Text color={"green"}>PUT: super Quality</Text>}   
              </FormControl>

              {/* Prices Field */}
              {quality.prices.map((price, priceIndex) => (
                <FormControl key={priceIndex} mt={2}>
                  <FormLabel>{`Price ${priceIndex + 1}`}</FormLabel>
                  <Input
                    type="number"
                    name={`price${index}_${priceIndex}`}
                    onChange={(event) => handlePriceChange(event, index, priceIndex)}
                    value={price}
                  />
                </FormControl>
              ))}

              {/* Add Price Button */}
              <Button
                mt={2}
                onClick={() =>
                  setFormData((prevData) => {
                    const newQualities = [...prevData.qualities];
                    newQualities[index].prices.push('');
                    return { ...prevData, qualities: newQualities };
                  })
                }
              >
                Add Price
              </Button>
            </Box>
          ))}

          {/* Add Quality Button */}
          <Button isDisabled={formData.qualities.length>=4} mt={4} onClick={() => setFormData((prevData) => ({ ...prevData, qualities: [...prevData.qualities, { type: '', prices: [''] }] }))}>
            Add Quality
          </Button>

          {/* Submit Button */}
        {addLoading ? <Button isLoading mt={4} ml={2}  spinner={<BeatLoader size={8} color='white' />} colorScheme="yellow"  onClick={handleSubmit}>
           ADD PRODUCT
           </Button> :   <Button mt={4} ml={2} colorScheme="yellow"  onClick={handleSubmit}>
           ADD PRODUCT
           </Button>}
        </Box>
         </ModalBody>
          <ModalFooter>
            {/* <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
              Add Gemstone
            </Button> */}
            <Button colorScheme="red" onClick={handleCloseAddModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


    {isLoading ? <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange.200"
            size="xl"
            position={"relative"}
            top={"10rem"}
          />
        </Center> :   <Grid  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        {filteredData.map((gemstone, index) => (
          <Container   key={index} maxW="5xl" p={{ base: 5, md: 6 }}>
            <Stack  boxShadow={"lg"} bgColor="#f8f9fa" maxW="100%" spacing={2} p={4} rounded="md">
              <HStack justifyContent="space-between" alignItems="baseline">
                <Box pos="relative">
                  <Avatar
                    boxShadow="2px 0px 6px 2px #d2d2d2"
                    src={gemstone.image}
                    size="xl"
                    borderRadius="md"
                  />
                </Box>
                <HStack justifyContent="flex-end">
                  {/* <Button
                    colorScheme="teal"
                    onClick={() => handleEditClick(gemstone)}
                  >
                    Edit
                  </Button> */}
                  <Button
                   colorScheme={textColor === 'dark' ? 'red' : 'red'}
                    onClick={() => handleDelete(gemstone._id)}
                  >
                    Delete
                  </Button>
                </HStack>
              </HStack>

              <chakra.h1 fontSize="xl"  fontWeight="bold" color={"black"}>
                {gemstone.title}
              </chakra.h1>

              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left" color="black">
                        Benefits
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel color="black" pb={4}>{gemstone.benefits}</AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Prices
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Table variant="striped" border="1px dashed black">
                      <Thead></Thead>
                      <Tbody>
                        {gemstone.qualities.map((quality, i) => (
                          <Tr key={i}>
                            <Td>{quality.type}</Td>
                            {quality.prices.map((price, j) => (
                              <Td key={j}>{`${price}/-`}</Td>
                            ))}
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Divider />
            </Stack>
          </Container>
        ))}
      </Grid>}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Gemstone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>New Photo</FormLabel>
              <Input type="file" />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Quality</FormLabel>
              <Select>
                <option value="II nd Quality">II nd Quality</option>
                <option value="1st Quality">1st Quality</option>
                <option value="1st Quality">Special Quality</option>
                <option value="1st Quality">Super Quality</option>
              </Select>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Ratti Price</FormLabel>
              <Input type="number" placeholder="Enter Ratti Price" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSaveEdit}>
              Save
            </Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Products;

import {
  chakra,
  Box,
  Stack,
  HStack,
  Container,
  Avatar,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Grid,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Center,
  Textarea,
  Text,
  useColorMode,
  Spinner,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Heading,
} from "@chakra-ui/react";
// import data from "../Data";
import { UploadButton } from "@bytescale/upload-widget-react";
import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { useState, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";

import { useToast } from "@chakra-ui/react";
const Yantra = () => {
  const cld = new Cloudinary({cloud: {cloudName: 'dhjybl67e'}});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [inLoading, setInLoading] = useState(false);
  const toast = useToast();
  const [render, setRender] = useState(false);
  const [product, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editMenu, setEditMenu] = useState({})
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(product);
  const [menuItem, setMenuItem] = useState([]);
  const [dishImage, setDishImage] = useState("");
  const [menuImageset, setMenuImage] = useState("");
  const [editLoading, setEditLoading] = useState(false)
  const [menuLoading, setMenuLoading] = useState(false)
  const [formData1, setFormData1] = useState({
    title: "",
    image: "",
  });

  const textColor = localStorage.getItem("chakra-ui-color-mode");
  const options = {
    apiKey: "public_FW25c7y2WNFFmat5vMfB3pEAVTEb",
    maxFileCount: 1,
    showFinishButton: false,
  };

  const renderComp = () => {
    setRender((prev) => !prev);
  };

  const fetchData = async () => {
    setInLoading(true);
    try {
      const response = await axios.get(
        "https://do-eat-backen.onrender.com/yantra"
      );
      setInLoading(false);
      setProducts(response.data);
      console.log("ordersss", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setInLoading(false);
    }
  };

  const handleAddGemstoneClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAddModalOpen(false);
    setEditingProduct({
      title: "",
      description: "",
      image: "",
      quantity: 0,
      price: "",
      veg: "",
      category: "",
    });
    setDishImage("");
    setMenuImage("");
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setFormData({
      title: "",
      description: "",
      image: "",
      quantity: 0,
      price: "",
      veg: "",
      category: "",
    });
    setDishImage("");
    setMenuImage("");
  };

  const handleEditClick = (product) => {
    console.log(product)
    setEditingProduct(product);
    setIsModalOpen(true);
  };
  const handleEditMenu = (menuItem) => {
    console.log(menuItem)
    setEditMenu(menuItem);
    setIsModalOpen(true);
  };

  const handleEditSubmit =  () => {
    console.log(editingProduct);
setEditLoading(true)
axios.patch(`https://do-eat-backen.onrender.com/yantra/update/${editingProduct._id}`, editingProduct)
.then((res)=> {
  toast({
    title: res.data.msg,
    status: 'success',
    duration: 3000,
    isClosable: true,
  })
  setEditLoading(false)
  fetchData();
  handleCloseModal();
}).catch((error)=> {
  toast({
    title: "unable to edit dish something wrong",
    status: 'error',
    duration: 3000,
    isClosable: true,
  })
  console.log(error.message)
  setEditLoading(false)
})

   
  };
  const handleEditMenunew =  () => {
    console.log("edit",editMenu);
setMenuLoading(true)
axios.patch(`https://do-eat-backen.onrender.com/menu/update/${editMenu._id}`, editMenu)
.then((res)=> {
  toast({
    title: res.data.msg,
    status: 'success',
    duration: 3000,
    isClosable: true,
  })
  setMenuLoading(false)
  renderComp();
  handleCloseModal();
}).catch((error)=> {
  toast({
    title: "unable to edit menu something wrong",
    status: 'error',
    duration: 3000,
    isClosable: true,
  })
  console.log(error.message)
  setMenuLoading(false)
})
  };

  useEffect(() => {
    const filteredGemstones = product.filter((gemstone) =>
      gemstone.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredGemstones);
  }, [searchQuery, product]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://do-eat-backen.onrender.com/yantra/delete/${id}`
      );

      if (res.data.state) {
        renderComp();
        toast({
          title: "Product deleted successfully!!",
          status: "success",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error deleting product!!",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
      console.error("Error deleting product:", error);
    }
  };
  const handleDeletemenu = async (id) => {
    try {
      const res = await axios.delete(
        `https://do-eat-backen.onrender.com/menu/delete/${id}`
      );

      if (res.data.state) {
        renderComp();
        toast({
          title: "Product deleted successfully!!",
          status: "success",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error deleting product!!",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
      console.error("Error deleting product:", error);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    quantity: "",
    price: "",
    veg: "",
    category: "",
    discount: "",
    cutprice: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    // const parsedValue = name === "quantity" ? parseInt(value, 10) : value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
     setEditingProduct((prev)=> {
        return {...prev, [name]:value}
      })
  }
 

  const handleChange1 = (event) => {
    const { name, value } = event.target;
    // const parsedValue = name === "quantity" ? parseInt(value, 10) : value;
    setFormData1((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleChangeMenu = (event) => {
    const { name, value } = event.target;
    // const parsedValue = name === "quantity" ? parseInt(value, 10) : value;
    setEditMenu((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleChangePrice = (event) => {
    const { name, value } = event.target;

    const parsedValue1 = name === "price" ? parseInt(value, 10) : value;
    setFormData((prevData) => ({ ...prevData, [name]: parsedValue1 }));
  };
  const handleChangecutPrice = (event) => {
    const { name, value } = event.target;

    const parsedValue1 = name === "cutprice" ? parseInt(value, 10) : value;
    setFormData((prevData) => ({ ...prevData, [name]: parsedValue1 }));
  };
  const handleChangePrice1 = (event) => {
    const { name, value } = event.target;

    const parsedValue1 = name === "price" ? parseInt(value, 10) : value;
    setEditingProduct((prevData) => ({ ...prevData, [name]: parsedValue1 }));
  };
  const handleChangecutPrice1 = (event) => {
    const { name, value } = event.target;

    const parsedValue1 = name === "cutprice" ? parseInt(value, 10) : value;
    setEditingProduct((prevData) => ({ ...prevData, [name]: parsedValue1 }));
  };



  const handleChangeDiscount = (event) => {
    const { name, value } = event.target;

    const parsedValue2 = name === "discount" ? parseInt(value, 10) : value;
    setFormData((prevData) => ({ ...prevData, [name]: parsedValue2 }));
  };

  const handleSubmit = async () => {
    setAddLoading(true);
    try {
      const res = await axios.post(
        "https://do-eat-backen.onrender.com/yantra/create",
        formData
      );

      if (res.data.state) {
        toast({
          title: "Product Added successfully!!",
          status: "success",
          duration: 4000,
          position: "top-right",
          isClosable: true,
        });

        setFormData({
          title: "",
          price: "",
          description: "",
          image: "",
          quantity: 0,
          veg: "",
          discount: "",
          cutprice: "",
        });
        setDishImage("");
        renderComp();
        setAddLoading(false);
        setIsAddModalOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error during adding product",
        status: "error",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });

      console.log(error);
      setAddLoading(false);
    }
  };

  const handleAddMenu = () => {
    console.log("data1", formData1);
    axios
      .post("https://do-eat-backen.onrender.com/menu/create", formData1)
      .then((res) => {
        console.log(res.data);
        toast({
          title: res.data.msg,
          status: "success",
          duration: 4000,
          position: "top-right",
          isClosable: true,
        });
        renderComp();
      })
      .catch((error) => {
        console.log(error.message);
        toast({
          title: "unable to add menu",
          status: "success",
          duration: 4000,
          position: "top-right",
          isClosable: true,
        });
      });
    setFormData1({
      title: "",
      image: "",
    });
  };

  const fetchMenu = () => {
    axios
      .get("https://do-eat-backen.onrender.com/menu")
      .then((res) => {
        console.log("menu", res.data);
        setMenuItem(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


 // Use this sample image or upload your own via the Media Explorer
 const img = cld.image('cld-sample-5')
 .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
 .quality('auto')
 .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio



  useEffect(() => {
    fetchData();
    fetchMenu();
  }, [render]);
console.log("dishImage",dishImage)
  return (
    <Box>
      <chakra.h1 textAlign="center" fontSize="2xl" fontWeight="bold" mb={4}>
        Dishes Products
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
            Add Dishes
          </Button>
          <Button
            ml={5}
            variant={"outline"}
            colorScheme={"green"}
            onClick={handleAddGemstoneClick}
          >
            Add Menu
          </Button>
        </Center>
      </Box>

      {/* isOpen={isAddModalOpen} onClose={handleCloseAddModal} */}
      <Modal size={"xl"} isOpen={isAddModalOpen} onClose={handleCloseAddModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {/* add model content start */}

              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" fontWeight={600} textAlign="left">
                        Add Menu
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {/* add model content start */}
                    {menuImageset && (
                      <Text bg={"green"} color={"white"}>
                        {menuImageset}
                      </Text>
                    )}
                    <Box display={"flex"} gap={2}>
                      <FormControl>
                        <FormLabel> Menu Title</FormLabel>
                        <Input
                          type="text"
                          name="title"
                          onChange={handleChange1}
                          value={formData1.title.toLowerCase()}
                          placeholder="product name"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Menu Image</FormLabel>
                        <Input
                          type="text"
                          name="image"
                          onChange={handleChange1}
                          value={formData1.image}
                          placeholder="image address"
                        />
                      </FormControl>
                      {/* image uplaod code goes here   */}
                      <Box className="container">
                        <UploadButton
                          options={options}
                          onComplete={(files) =>
                            setMenuImage(files.map((x) => x.fileUrl).join("\n"))
                          }
                        >
                          {({ onClick }) => (
                            <Button
                              mt={7}
                              colorScheme="green"
                              onClick={onClick}
                            >
                              Image Upload..
                            </Button>
                          )}
                        </UploadButton>
                       
                      </Box>
                    </Box>

                    <Box>
                      <Button
                        colorScheme="red"
                        width={"100%"}
                        mt={2}
                        onClick={handleAddMenu}
                      >
                        Submit
                      </Button>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              {/* add model content start */}
              <Center>
                <Box>
                  <Heading m={2}>Add Dishes</Heading>
                  {/* <Text border={"1px solid gray" } bg={"green"} color={"white"}>{dishImage}</Text> */}
                  {dishImage && (
                    <Text
                      border={"1px solid gray"}
                      bg={"green"}
                      color={"white"}
                      // contentEditable={true}
                    >
                      {dishImage? dishImage: "unable to read image"}
                    </Text>
                  )}
                </Box>
              </Center>

              <Box display={"flex"} gap={2}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={formData.title}
                    placeholder="product name"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Image</FormLabel>
                  <Input
                    type="text"
                    name="image"
                    onChange={handleChange}
                    value={formData.image}
                    placeholder="image address"
                  />
                </FormControl>
                {/* image uplaod code goes here   */}
                <Box className="container">
                  <UploadButton
                    options={options}
                    onComplete={(files) =>
                      setDishImage(files.map((x) => x.fileUrl).join("\n"))
                    }
                  >
                    {({ onClick }) => (
                      <Button mt={7} colorScheme="green" onClick={onClick}>
                        Image Upload..
                      </Button>
                    )}
                  </UploadButton>
                </Box>
              </Box>
              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  name="price"
                  onChange={handleChangePrice}
                  value={formData.price}
                  placeholder="Enter price"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Cut Price</FormLabel>
                <Input
                  type="number"
                  name="cutprice"
                  onChange={handleChangecutPrice}
                  value={formData.cutprice}
                  placeholder="Enter cut price"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Quantity</FormLabel>
                <Input
                  type="number"
                  name="quantity"
                  onChange={handleChange}
                  value={formData.quantity}
                  placeholder="product quantity"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Discount</FormLabel>
                <Input
                  type="number"
                  name="discount"
                  onChange={handleChangeDiscount}
                  value={formData.discount}
                  placeholder="product discount"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>select menu</FormLabel>
                <Select
                  name="category"
                  onChange={handleChange}
                  placeholder="Select option"
                >
                  {menuItem &&
                    menuItem.map((item, index) => (
                      <option key={index} value={item.title}>{item.title}</option>
                    ))}
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Sort filter</FormLabel>
                <Select
                  name="veg"
                  onChange={handleChange}
                  placeholder="Select option"
                >
                  <option value="veg">Veg</option>
                  <option value="nonveg">Nonveg</option>
                </Select>
              </FormControl>
              {/* Submit Button */}
              {addLoading ? (
                <Button
                  isLoading
                  mt={4}
                  ml={2}
                  spinner={<BeatLoader size={8} color="white" />}
                  colorScheme="yellow"
                  // onClick={handleSubmit}
                >
                  ADD Dishes
                </Button>
              ) : (
                <Button
                  mt={4}
                  ml={2}
                  colorScheme="yellow"
                  onClick={handleSubmit}
                >
                  ADD Dishes
                </Button>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            {/* <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
              Add Gemstone
            </Button> */}
            <Button colorScheme="red" onClick={handleCloseAddModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {inLoading ? (
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
        <Accordion allowToggle mt={5}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Open Your Dishes Products
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}></AccordionPanel>
            <AccordionPanel pb={4}>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={4}
              >
                {filteredData.map((gemstone, index) => (
                  <Container key={index} maxW="5xl" p={{ base: 5, md: 6 }}>
                    <Stack
                      boxShadow={"lg"}
                      bgColor="#f8f9fa"
                      maxW="100%"
                      spacing={2}
                      p={4}
                      rounded="md"
                    >
                      <HStack
                        justifyContent="space-between"
                        alignItems="baseline"
                      >
                        <Box pos="relative">
                          <Avatar
                            boxShadow="2px 0px 6px 2px #d2d2d2"
                            src={gemstone.image}
                            size="xl"
                            borderRadius="md"
                          />
                        </Box>
                        <HStack justifyContent="flex-end">
                          <Button
                            colorScheme="green"
                            onClick={() => handleEditClick(gemstone)}
                          >
                            Edit
                          </Button>
                          <Button
                            colorScheme={textColor === "dark" ? "red" : "red"}
                            onClick={() => handleDelete(gemstone._id)}
                          >
                            Delete
                          </Button>
                        </HStack>
                      </HStack>

                      <chakra.h1
                        fontSize="xl"
                        fontWeight="bold"
                        color={"black"}
                      >
                        Name : {gemstone.title}
                      </chakra.h1>
                      <chakra.h1
                        fontSize="xl"
                        fontWeight="bold"
                        color={"black"}
                      >
                        cut Price : {gemstone.price}
                      </chakra.h1>
                      <chakra.h1
                        fontSize="xl"
                        fontWeight="bold"
                        color={"black"}
                      >
                        Price : {gemstone.cutprice}
                      </chakra.h1>
                      <Text color={"black"}>
                        Description : {gemstone.description}
                      </Text>
                      <Text color={"black"}>
                        Discount : {gemstone.discount}%
                      </Text>

                      <Divider />
                    </Stack>







                  </Container>
                ))}
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}

      {/* menu accordians div start here */}
      <Accordion allowToggle mt={5}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Open Your menu
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}></AccordionPanel>
          <AccordionPanel pb={4}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={4}
            >
              {menuItem.map((menu, index) => (
                <Container key={index} maxW="5xl" p={{ base: 5, md: 6 }}>
                  <Stack
                    boxShadow={"lg"}
                    bgColor="#f8f9fa"
                    maxW="100%"
                    spacing={2}
                    p={4}
                    rounded="md"
                  >
                    <HStack
                      justifyContent="space-between"
                      alignItems="baseline"
                    >
                      <Box pos="relative">
                        <Avatar
                          boxShadow="2px 0px 6px 2px #d2d2d2"
                          src={menu.image}
                          size="xl"
                          borderRadius="md"
                        />
                      </Box>
                      <HStack justifyContent="flex-end">
                        <Button
                    colorScheme="green"
                    onClick={() => handleEditMenu(menu)}
                  >
                    Edit
                  </Button>
                        <Button
                          colorScheme={textColor === "dark" ? "red" : "red"}
                          onClick={() => handleDeletemenu(menu._id)}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </HStack>

                    <chakra.h1 fontSize="xl" fontWeight="bold" color={"black"}>
                      Name : {menu.title}
                    </chakra.h1>

                    <Divider />
                  </Stack>
                </Container>
              ))}
            </Grid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      {/* menu accordians div end here */}


{/* update modal start from here */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
  
              {/* add model content start */}

              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" fontWeight={600} textAlign="left">
                        update Menu
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {/* add model content start */}
                    {menuImageset && (
                      <Text bg={"green"} color={"white"}>
                        {menuImageset}
                      </Text>
                    )}
                    <Box display={"flex"} gap={2}>
                      <FormControl>
                        <FormLabel> Menu Title</FormLabel>
                        <Input
                          type="text"
                          name="title"
                          onChange={handleChangeMenu}
                          value={editMenu?.title?.toLowerCase()}
                          placeholder="product name"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Menu Image</FormLabel>
                        <Input
                          type="text"
                          name="image"
                          onChange={handleChangeMenu}
                          value={editMenu?.image}
                          placeholder="image address"
                        />
                      </FormControl>
                      {/* image uplaod code goes here   */}
                      <Box className="container">
                        <UploadButton
                          options={options}
                          onComplete={(files) =>
                            setMenuImage(files.map((x) => x.fileUrl).join("\n"))
                          }
                        >
                          {({ onClick }) => (
                            <Button
                              mt={7}
                              colorScheme="green"
                              onClick={onClick}
                            >
                              Image Upload..
                            </Button>
                          )}
                        </UploadButton>
                      </Box>
                    </Box>

                    <Box>
               {menuLoading ? <Button
               isLoading
                        colorScheme="red"
                        width={"100%"}
                        mt={2}
                        // onClick={handleEditMenunew}
                      >
                        Submit
                      </Button> : <Button
                        colorScheme="red"
                        width={"100%"}
                        mt={2}
                        onClick={handleEditMenunew}
                      >
                        Submit
                      </Button>}       
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              {/* add dish model content start */}
              <Center>
                <Box>
                  <Heading m={2}>Update Dishes</Heading>
                  {/* <Text border={"1px solid gray" } bg={"green"} color={"white"}>{dishImage}</Text> */}
                  {dishImage && (
                    <Text
                      border={"1px solid gray"}
                      bg={"green"}
                      color={"white"}
                      // contentEditable={true}
                    >
                      {dishImage}
                    </Text>
                  )}
                </Box>
              </Center>

              <Box display={"flex"} gap={2}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    name="title"
                    onChange={handleInputChange}
                    value={editingProduct?.title}
                    placeholder="product name"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Image</FormLabel>
                  <Input
                    type="text"
                    name="image"
                    onChange={handleInputChange}
                    value={editingProduct?.image}
                    placeholder="image address"
                  />
                </FormControl>
                {/* image uplaod code goes here   */}
                <Box className="container">
                  <UploadButton
                    options={options}
                    onComplete={(files) =>
                      setDishImage(files.map((x) => x.fileUrl).join("\n"))
                    }
                  >
                    {({ onClick }) => (
                      <Button mt={7} colorScheme="green" onClick={onClick}>
                        Image Upload..
                      </Button>
                    )}
                  </UploadButton>
                </Box>
              </Box>
              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  name="price"
                  onChange={handleChangePrice1}
                  value={editingProduct?.price}
                  placeholder="Enter price"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Cut Price</FormLabel>
                <Input
                  type="number"
                  name="cutprice"
                  onChange={handleChangecutPrice1}
                  value={editingProduct?.cutprice}
                  placeholder="Enter cut price"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  onChange={handleInputChange}
                  value={editingProduct?.description}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Quantity</FormLabel>
                <Input
                  type="number"
                  name="quantity"
                  onChange={handleInputChange}
                  value={editingProduct?.quantity}
                  placeholder="product quantity"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Discount</FormLabel>
                <Input
                  type="number"
                  name="discount"
                  onChange={handleInputChange}
                  value={editingProduct?.discount}
                  placeholder="product discount"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>select menu</FormLabel>
                <Select
                  name="category"
                  onChange={handleInputChange}
                  placeholder="Select option"
                >
                  {menuItem &&
                    menuItem.map((item) => (
                      <option value={item.title}>{item.title}</option>
                    ))}
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Sort filter</FormLabel>
                <Select
                  name="veg"
                  onChange={handleInputChange}
                  placeholder="Select option"
                >
                  <option value="veg">Veg</option>
                  <option value="nonveg">Nonveg</option>
                </Select>
              </FormControl>
              {/* Submit Button */}
              {editLoading ? (
                <Button
                  isLoading
                  mt={4}
                  ml={2}
                  spinner={<BeatLoader size={8} color="white" />}
                  colorScheme="yellow"
                  // onClick={handleSubmit}
                >
                update Dishes
                </Button>
              ) : (
                <Button
                  mt={4}
                  ml={2}
                  colorScheme="yellow"
                  onClick={handleEditSubmit}
                >
                  Update Dishes
                </Button>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            {/* <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
              Add Gemstone
            </Button> */}
            <Button colorScheme="red" onClick={handleCloseAddModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


    </Box>
  );
};

export default Yantra;

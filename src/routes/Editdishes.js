import React from 'react'

const Editdishes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleCloseModal = () => {
        setIsModalOpen(false);
      };

  return (
    <div>
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
                    menuItem.map((item) => (
                      <option value={item.title}>{item.title}</option>
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
                  onClick={()=> handleEditSubmit(gemstone._id)}
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
    </div>
  )
}

export default Editdishes

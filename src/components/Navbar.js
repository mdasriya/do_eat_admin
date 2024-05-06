import { RiLogoutCircleRFill } from "react-icons/ri";
import { MdArrowForwardIos, MdOutlineProductionQuantityLimits } from "react-icons/md";
import React from "react";
import {
  Box,
  Link,
  Text,
  List,
  ListItem,
  Image,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
} from "@chakra-ui/react";
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import sun from "../imgs/sun.png";
import { RiLogoutCircleFill } from "react-icons/ri";
import { useRevenue } from "../Context";
import { BsArrowRightShort } from "react-icons/bs";
function Navbar() {
 
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { totalWorkShip, totalYantra,setNavWidth, totalgamestone,totalAryuvedic } = useRevenue();

const handleHideNav = () => {
setNavWidth((prev) => !prev)
}

  const handleLogout = () => {
    toast({
      title: "Logout successfully!!",
      status: "error",
      duration: 3000,
      position: "top-right",
      isClosable: true,
    });
    localStorage.clear();

    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <IconContext.Provider value={{ color: "undefined" }}>
      <Box>
        <Box className="nav-menu active">
          <List className="nav-menu-items">
            <ListItem className="navbar-toggle">
              <Link
                style={{ textDecoration: "none" }}
                as={ReactRouterLink}
                to="#"
                className="menu-bars"
              >
                {/* <CloseIcon fontSize="xl" /> */}
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  position={"relative"}
                  right={"2rem"}
                  alignItems={"center"}
                  marginLeft={"50px"}
                >
                  <Image src="https://foodorder-pink.vercel.app/assets/Group%2047-VPe2s1rp.png" height={"10"} width={"10"} mr={"2"} />
                  <Text mt={2} fontSize="20px" fontWeight={500}>
                    Do Eat
                  </Text>
                 
                </Box>
              </Link>
            </ListItem>
            {SidebarData.map((item, index) => (
              <>
                {item.title === "Products" ? (
                  <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                          >
                            <Box mt={1} display={"flex"} marginLeft={3}>
                              <MdOutlineProductionQuantityLimits size={20} />
                              <Box
                                fontWeight={500}
                                as="span"
                                fontSize={"19px"}
                                flex="1"
                                textAlign="left"
                              >
                                Product
                              </Box>
                            </Box>
                          </Box>
                          <Box width={"100%"}>
                            <AccordionIcon />
                          </Box>
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4} cursor={"pointer"} marginLeft={10}>
                        {/* <Box display={"flex"}>
                          <BsArrowRightShort
                            size={20}
                            style={{ marginTop: "5px" }}
                          />
                          <Text
                            color={"gray"}
                            fontSize={18}
                            onClick={() => navigate("/products")}
                            _hover={{ color: "black" }}
                          >
                            Gemstone({totalgamestone})
                          </Text>
                        </Box> */}

                        <Box display={"flex"}>
                          <BsArrowRightShort
                            size={20}
                            style={{ marginTop: "5px" }}
                          />{" "}
                          <Text
                            color={"gray"}
                            _hover={{ color: "black" }}
                            fontSize={18}
                            onClick={() => navigate("/yantra")}
                          >
                            Dishes({totalYantra})
                          </Text>
                        </Box>

                        {/* <Box display={"flex"}>
                          <BsArrowRightShort
                            size={20}
                            style={{ marginTop: "5px" }}
                          />
                          <Text
                            color={"gray"}
                            _hover={{ color: "black" }}
                            fontSize={18}
                            onClick={() => navigate("/workShip")}
                          >
                            WorkShip({totalWorkShip})
                          </Text>
                        </Box> */}
                        {/* <Box display={"flex"}>
                          <BsArrowRightShort
                            size={20}
                            style={{ marginTop: "5px" }}
                          />
                          <Text
                            color={"gray"}
                            _hover={{ color: "black" }}
                            fontSize={18}
                            onClick={() => navigate("/aryuvedic")}
                          >
                            Aryuvedic({totalAryuvedic})
                          </Text>
                        </Box> */}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <ListItem key={index} className={item.cName}>
                    <Text as={ReactRouterLink} to={item.path}>
                      {item.icon}

                      <Text ml={2}>{item.title}</Text>
                    </Text>
                  </ListItem>
                )}
              </>
            ))}

            {location.pathname === "/login" && (
              <Box mt={2} ml={8} display={"flex"}>
                <RiLogoutCircleRFill size={20} />
                <Text
                  letterSpacing={2}
                  cursor={"pointer"}
                  fontWeight={500}
                  fontSize={"17px"}
                  onClick={handleLogin}
                  color={"green"}
                  mt={"-5px"}
                  ml={2}
                >
                  Login
                </Text>
              </Box>
            )}
            {location.pathname !== "/login" && (
              <Box mt={4} ml={8} display={"flex"}>
                <RiLogoutCircleFill size={20} />
                <Text
                  letterSpacing={2}
                  cursor={"pointer"}
                  fontWeight={500}
                  fontSize={"17px"}
                  onClick={handleLogout}
                  color={"red"}
                  mt={"-4px"}
                  ml={2}
                >
                  Logout
                </Text>
              </Box>
            )}
          </List>
        </Box>
      </Box>
    </IconContext.Provider>
  );
}

export default Navbar;

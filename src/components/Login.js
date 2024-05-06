import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Checkbox,
  Link,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const toast = useToast();
  const handleLogin = () => {
    // Perform authentication logic here
console.log(email, password)

    if (email === "shendeomi98@gmail.com" && password === "Omii@123") { 
      localStorage.setItem("isAdminLoggedIn", "true");
      nav("/");
      // Show success toast
      toast({
        title: "Login successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <Stack minH="100vh" direction={{ base: "column-reverse", md: "row" }}>
      <Flex flex={1}>
        <Image
        ml={4}
          alt="Cover image"
          objectFit="cover"
          src="https://img.freepik.com/free-vector/my-password-concept-illustration_114360-4294.jpg?w=740&t=st=1706000528~exp=1706001128~hmac=20289b2ce16b90e8a5e830cb57ed0715ee69e6b3a07a5052340501864b8929e9"
        />
      </Flex>
      <Flex p={8} flex={1} align="center" justifyContent="center">
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">ADMIN LOGIN</Heading>
          </Stack>
          <VStack
            as="form"
            spacing={8}
            boxSize={{ base: "xs", sm: "sm", md: "md" }}
            h="max-content !important"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
          >
            <VStack spacing={4} w="100%">
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  rounded="md"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  rounded="md"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Stack direction="row" justifyContent="space-between" w="100%">
                <Checkbox colorScheme="green" size="md">
                  Remember me
                </Checkbox>
                <Link fontSize={{ base: "md", sm: "md" }}>
                  Forgot password?
                </Link>
              </Stack>
              <Button
                bg="green.300"
                color="white"
                _hover={{
                  bg: "green.500",
                }}
                rounded="md"
                w="100%"
                onClick={handleLogin}
              >
               Sign in
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Login;

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { newRequest } from "../../utils/newRequest";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const toast = useToast();
  const onChange = (e) => {
    console.log(e.target.name);
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const raw = JSON.stringify(registerData);
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: raw,
      redirect: "follow",
    };

    newRequest("/auth/signup", requestOptions)
      .then((result) => {
        if (!result.data) {
          return;
        }
        toast({
          title: result.data.status ? "Account created!" : "Signup Failed",
          description: result.data.message,
          status: result.data.status ? "success" : "error",
          duration: 6000,
          isClosable: true,
        });
      })
      .catch((error) => {
        alert(JSON.stringify({ err: error }));
        console.log("error", error.response);
      });
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      // bg={useColorModeValue("gray.50")}
    >
      <Stack spacing={4} mx={"auto"} maxW={"md"} px={1} w={"100%"}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <form onSubmit={onSubmit}>
          <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} p={8}>
            <Stack spacing={4}>
              <FormControl id="username" isRequired onChange={onChange}>
                <FormLabel>Username</FormLabel>
                <Input type="text" name="username" />
              </FormControl>
              <FormControl id="email" onChange={onChange} isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" />
              </FormControl>
              <FormControl id="password" onChange={onChange} isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"brand.700"}
                  type="submit"
                  color={"white"}
                  _hover={{
                    bg: "brand.800",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Text fontSize={"sm"} color={"gray.600"}>
                By joining I agree to receive emails from Fiverr.
              </Text>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link href="/login" color={"brand.700"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}

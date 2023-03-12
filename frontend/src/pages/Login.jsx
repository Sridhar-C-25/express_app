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
import { apiStatus } from "../../Enums/apiStatus";
import { useNavigate } from "react-router-dom";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();

  const onChange = (e) => {
    console.log(e.target.name);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const raw = JSON.stringify(loginData);
    console.log(raw);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: raw,
      redirect: "follow",
    };

    newRequest("/auth/login", requestOptions)
      .then((result) => {
        console.log(result);
        if (!result.data) {
          return;
        }
        toast({
          title: result.data.status ? "Logged in" : "Login Failed",
          description: result.data.message,
          status: result.data.status ? "success" : "error",
          duration: 6000,
          isClosable: true,
        });
        if (result.data.status === apiStatus.success) {
          navigate("/");
        }
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
            Login
          </Heading>
        </Stack>
        <form onSubmit={onSubmit}>
          <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} p={8}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired onChange={onChange}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" />
              </FormControl>
              <FormControl id="password" isRequired onChange={onChange}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
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
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"brand.700"}
                  color={"white"}
                  _hover={{
                    bg: "brand.800",
                  }}
                >
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Not a member yet?{" "}
                  <Link href="/signup" color={"brand.700"}>
                    Signup
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

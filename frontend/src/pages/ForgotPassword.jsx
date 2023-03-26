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
import { useNavigate, useParams } from "react-router-dom";

function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token, userId } = useParams();
  const navigate = useNavigate();
  const [forgotData, setForgotData] = useState({
    newpassword: "",
    confirmpassword: "",
  });
  const toast = useToast();

  const onChange = (e) => {
    console.log(e.target.name);
    setForgotData({ ...forgotData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({ ...forgotData, token, userId });
    console.log(raw);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: raw,
      redirect: "follow",
    };

    newRequest("/auth/forgotpassword", requestOptions)
      .then((result) => {
        console.log(result);
        if (!result.data) {
          return;
        }
        toast({
          title: result.data.status
            ? "Password Changed Successfully"
            : "Password Changed Failed",
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
        // alert(JSON.stringify({ err: error }));
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
            Change Password
          </Heading>
        </Stack>
        <form onSubmit={onSubmit}>
          <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} p={8}>
            <Stack spacing={4}>
              <FormControl id="newpassword" isRequired onChange={onChange}>
                <FormLabel>New Password</FormLabel>
                <InputGroup>
                  <Input
                    name="newpassword"
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
              <FormControl id="confirmpassword" isRequired onChange={onChange}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    pattern={forgotData.newpassword}
                    name="confirmpassword"
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowConfirmPassword(
                          (showConfirmPassword) => !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
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
                  Change Password
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}

export default ForgotPassword;

import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { newRequest } from "../../utils/newRequest";

const Verification = () => {
  const { userId, vcode } = useParams();
  const [vstatus, setVStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    function onVerifyAccount() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          userId,
          vcode,
        }),
        redirect: "follow",
      };
      setLoading(true);
      newRequest("/auth/verifyaccount", requestOptions)
        .then((result) => {
          setLoading(false);

          console.log(result);
          if (!result.data) {
            return;
          }
          console.log(result);
          result?.data?.status ? setVStatus(true) : setVStatus(false);
          toast({
            title: result.data.status
              ? "Verification Successfully"
              : "Verification Failed",
            description: result.data.message,
            status: result.data.status ? "success" : "error",
            duration: 6000,
            isClosable: true,
          });
        })
        .catch((error) => {
          setLoading(false);
          // alert(JSON.stringify({ err: error }));
          console.log("error", error.response);
        });
    }
    onVerifyAccount();
  }, []);
  return (
    <div className="min-h-screen grid place-items-center text-2xl font-medium">
      {loading ? (
        <div>loading...</div>
      ) : vstatus ? (
        <div className="flex flex-col items-center gap-6">
          <h4>Verfication Successfully</h4>
          <Button
            _hover={{
              bg: "brand.900",
            }}
            bg={"brand.800"}
            color="white"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      ) : (
        <h4>Verfication Failed</h4>
      )}
    </div>
  );
};

export default Verification;

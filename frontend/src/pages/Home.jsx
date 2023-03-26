import { useEffect, useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import {
  Badge,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import GigCard from "../components/GigCard";
const AutoplaySlider = withAutoplay(AwesomeSlider);
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { newRequest } from "../../utils/newRequest";
const Home = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    function getCookie(name) {
      var pattern = RegExp(name + "=.[^;]*");
      var matched = document.cookie.match(pattern);
      if (matched) {
        var cookie = matched[0].split("=");
        return cookie[1];
      }
      return false;
    }
    let data = getCookie("token");
    if (data) setToken(data);
  }, []);

  function sendForgotToken() {
    alert();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email: "iamsmartsri@gmail.com",
      }),
      redirect: "follow",
    };

    newRequest("/auth/forgotpasswordtoken", requestOptions)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <section className="h-[86vh] relative">
        <div
          className="absolute h-full w-full z-10 text-white
        max-w-4xl top-36  left-[50%] translate-x-[-50%]"
        >
          <Heading size={"3xl"}>24-Hour Flash Sale</Heading>
          <p className="max-w-sm mt-5 leading-8">
            Learn valuable, practical skills for less. Log in to see deals on
            courses. Sale ends tonight!
          </p>
          <div className="h-11 flex gap-1 mt-6 max-w-xl ">
            {/* <input
            type="text"
            className="font-medium  h-full max-w-sm px-3 text-gray-900  w-full rounded-md"
            placeholder='Try "Building Websites"'
          /> */}
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.500" />}
              />
              <Input
                type="tel"
                placeholder='Try "Building Websites"'
                height={"100%"}
                bgColor="white"
                color="gray.900"
                focusBorderColor="transparent"
              />
            </InputGroup>
            <button
              onClick={sendForgotToken}
              className="bg-brand-700 hover:bg-brand-900  h-full px-5 rounded-md"
            >
              Search
            </button>
          </div>
          <div className="flex items-center gap-2 mt-5">
            <span>Popular : </span>
            <button className="border p-2 px-5 text-xs bg-white/5 rounded-full">
              Web Development
            </button>
            <button className="border p-2 px-5 text-xs bg-white/5 rounded-full">
              Drawing
            </button>
            <button className="border p-2 px-5 text-xs bg-white/5 rounded-full">
              SEO
            </button>
          </div>
        </div>
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={3000}
          bullets={false}
          style={{
            height: "100%",
          }}
        >
          <div data-src="bg-hero1.jpg" />
          <div data-src="bg-hero2.jpg" />
          <div data-src="bg-hero3.jpg" />
        </AutoplaySlider>
      </section>
      <br />

      <div className="max-w-6xl mx-auto  mt-2">
        <Heading size="lg">Popular Course</Heading>
        <br />
        <Swiper
          spaceBetween={50}
          slidesPerView={3.7}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <GigCard></GigCard>
          </SwiperSlide>
          <SwiperSlide>
            <GigCard></GigCard>
          </SwiperSlide>
          <SwiperSlide>
            <GigCard></GigCard>
          </SwiperSlide>
          <SwiperSlide>
            <GigCard></GigCard>
          </SwiperSlide>
          <SwiperSlide>
            <GigCard></GigCard>
          </SwiperSlide>
        </Swiper>
      </div>
      <br />
      <br />
      <div className="flex items-center py-3  justify-between flex-wrap max-w-4xl gap-10 mx-auto">
        <img src="home-saller.jpg" alt=".." />
        <div className="flex-1 md:px-0 px-6">
          <Heading size="lg">Become an saller</Heading>
          <br />
          <p className="text-sm leading-7">
            As a seller, it is important to understand the needs of your
            customers. You should have a deep knowledge of the products or
            services you are selling. Building strong relationships with your
            clients is key to success in sales. Effective communication and a
            positive attitude are crucial in closing deals and achieving sales
            goals.
          </p>
          <br />
          <button className="bg-gray-900 text-gray-100 px-5 py-3 rounded-md">
            Start selling
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

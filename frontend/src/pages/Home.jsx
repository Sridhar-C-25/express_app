import { useEffect, useState } from "react";

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
  return <div>{token}</div>;
};

export default Home;

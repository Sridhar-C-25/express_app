import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function RootLayout({ children }) {
  const { pathname } = useLocation();
  const excludes = ["login", "signup", "forgotpassword", "verification"];
  return (
    <div className="font-mont">
      {excludes.includes(pathname.split("/")[1]) === false && <Navbar></Navbar>}
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
}

export default RootLayout;

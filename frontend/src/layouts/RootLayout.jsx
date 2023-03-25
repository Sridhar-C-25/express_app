import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function RootLayout({ children }) {
  return (
    <div className="font-mont">
      <Navbar></Navbar>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
}

export default RootLayout;

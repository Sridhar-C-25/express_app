import RootLayout from "./layouts/RootLayout";
import { Route, Routes } from "react-router-dom";
import LoginCard from "./pages/Login";
import SignupCard from "./pages/signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import { useEffect } from "react";
import { newRequest } from "../utils/newRequest";
import Verification from "./pages/Verification";
const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupCard />} />
        <Route path="/login" element={<LoginCard />} />
        <Route
          path="/forgotpassword/:userId/:token"
          element={<ForgotPassword />}
        />
        <Route path="/verification/:userId/:vcode" element={<Verification />} />
      </Routes>
    </RootLayout>
  );
};

export default App;

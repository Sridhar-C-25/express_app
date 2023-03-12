import RootLayout from "./layouts/RootLayout";
import { Route, Routes } from "react-router-dom";
import LoginCard from "./pages/Login";
import SignupCard from "./pages/signup";
import Home from "./pages/Home";
const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupCard />} />
        <Route path="/login" element={<LoginCard />} />
      </Routes>
    </RootLayout>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import PlaceOrder from "./Pages/PlaceOrder";
import { useSelector } from "react-redux";
import Footer from "./Components/Footer";
import { useState } from "react";
import Login from "./Pages/Login";

function App() {
  const { user } = useSelector((state) => state.user);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="mx-4 sm:mx-[10%]">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      <Footer />
      </div>
    </>
  );
}

export default App;

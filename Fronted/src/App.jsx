import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import PlaceOrder from "./Pages/PlaceOrder";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Components/Footer";
import { useEffect, useState } from "react";
import Login from "./Pages/Login";
import { fetchProfile } from "./features/userSlice";
import MyOrders from "./Pages/MyOrders";
import MobileApp from "./Pages/MobileApp";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [showLogin, setShowLogin] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  console.log(isAuthenticated);
  

  useEffect(() => {
    if (isAuthenticated) {
      setShowLogin(false);
    }
  }, [isAuthenticated]);

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
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/mobile-app" element={<MobileApp />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;

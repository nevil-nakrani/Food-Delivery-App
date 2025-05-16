import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { getFoodList, selectCartItemCount } from "../features/foodSlice";
import { toast } from "react-toastify";
import { logout } from "../features/userSlice";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";

const Navbar = ({ setShowLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const basketCount = useSelector(selectCartItemCount);

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const basketCountAnimation = {
    scale: [1, 1.1, 1],
    opacity: [0.8, 1, 0.8],
    transition: { duration: 1, repeat: Infinity },
  };
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const result = await dispatch(logout());
      if (result.payload?.success) {
        toast.success("Logout Successfully!");
        removeItem(KEY_ACCESS_TOKEN);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }

    setShowLogin(false);
    navigate("/");
  };

  const fetchMenuList = async () => {
    try {
      await dispatch(getFoodList());
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchMenuList();
  }, [dispatch]);

  return (
    <div className="relative z-50 flex justify-between items-center text-sm mb-5 py-4 border-b border-b-gray-400">
      {/* Logo */}
      <img
        className="w-40 h-8 cursor-pointer"
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Website Logo"
      />

      {/* Hamburger Menu Icon */}
      <motion.div
        className="lg:hidden cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileTap={{ scale: 0.9 }}
      >
        <img src={assets.menu_icon} alt="Menu" className="w-6 h-6" />
      </motion.div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-5 font-medium text-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `py-2 duration-200 ${
              isActive ? "text-orange-400 underline" : "text-gray-700"
            } hover:text-orange-500`
          }
        >
          Home
        </NavLink>
        {["Mobile App", "Contact Us"].map((item, index) => (
          <NavLink
            key={index}
            to={`/${item.toLowerCase().replace(" ", "-")}`}
            className={({ isActive }) =>
              `py-2 duration-200 ${
                isActive ? "text-orange-400 underline" : "text-gray-700"
              } hover:text-orange-500`
            }
          >
            {item}
          </NavLink>
        ))}
        {isAuthenticated && (
          <NavLink
            to="/myorders"
            className={({ isActive }) =>
              `py-2 duration-200 ${
                isActive ? "text-orange-400 underline" : "text-gray-700"
              } hover:text-orange-500`
            }
          >
            My Order
          </NavLink>
        )}
      </ul>

      {/* Right Section */}
      <div className="hidden lg:flex items-center gap-6">
        <img src={assets.search_icon} alt="Search" />
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img className="w-7 h-7" src={assets.basket_icon} alt="Basket" />
          {basketCount > 0 && (
            <motion.div
              className="absolute top-[-5px] right-[-5px] min-w-[18px] min-h-[18px] flex items-center justify-center bg-orange-600 text-white text-sm rounded-full"
              animate={basketCountAnimation}
            >
              {basketCount}
            </motion.div>
          )}
        </div>
        {!isAuthenticated ? (
          <button
            className="bg-transparent focus:outline focus:ring-1 focus:border-none border-gray-300 focus:ring-orange-300 focus:bg-orange-400 focus:text-white text-base border py-2 px-5 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
            onClick={() => setShowLogin(true)}
          >
            Sign In
          </button>
        ) : (
          <button
            className="bg-transparent focus:outline focus:ring-1 focus:border-none border-gray-300 focus:ring-orange-300 focus:bg-orange-400 focus:text-white text-base border py-2 px-5 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.ul
          className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg flex flex-col gap-3 text-lg px-6 py-4"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `py-2 duration-200 ${
                isActive ? "text-orange-400 underline" : "text-gray-700"
              } hover:text-orange-500`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          {["Mobile App", "Contact Us", "Search", "Cart", "Sign In", "Log"].map(
            (item, index) => (
              <NavLink
                key={index}
                to={`/${item.toLowerCase().replace(" ", "-")}`}
                className={({ isActive }) =>
                  `py-2 duration-200 ${
                    isActive ? "text-orange-400 underline" : "text-gray-700"
                  } hover:text-orange-500`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </NavLink>
            )
          )}
        </motion.ul>
      )}
    </div>
  );
};

export default Navbar;

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
  // Animation variants for menu items
  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.div
        className="w-64 min-h-screen bg-orange-300text-orange-300 border-r border-orange-300"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center p-4 border-b border-orange-300">
          <img src={assets.logo} alt="Logo" className="w-10 h-6 mr-2" />
          <h1 className="text-lg font-semibold ml-2 hidden lg:block">
            FoodApp
          </h1>
        </div>

        <motion.div
          className="flex flex-col space-y-4 p-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Add Items */}
          <motion.div variants={menuItemVariants} whileHover={{ scale: 1.05 }}>
            <NavLink
              to="/add-food"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-2 rounded cursor-pointer ${
                  isActive ? "bg-[tomato] text-white" : "hover:bg-orange-300"
                }`
              }
            >
              <img src={assets.add_icon} alt="Add Items" className="w-6 h-6" />
              <p className="text-base font-medium hidden lg:block">Add Items</p>
            </NavLink>
          </motion.div>

          {/* List Items */}
          <motion.div variants={menuItemVariants} whileHover={{ scale: 1.05 }}>
            <NavLink
              to="/list"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-2 rounded cursor-pointer ${
                  isActive ? "bg-[tomato] text-white" : "hover:bg-orange-300"
                }`
              }
            >
              <img
                src={assets.order_icon}
                alt="List Items"
                className="w-6 h-6"
              />
              <p className="text-base font-medium hidden lg:block">
                List Items
              </p>
            </NavLink>
          </motion.div>

          {/* Orders */}
          <motion.div variants={menuItemVariants} whileHover={{ scale: 1.05 }}>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `flex items-center space-x-4 p-2 rounded cursor-pointer ${
                  isActive ? "bg-[tomato] text-white" : "hover:bg-orange-300"
                }`
              }
            >
              <img src={assets.order_icon} alt="Orders" className="w-6 h-6" />
              <p className="text-base font-medium hidden lg:block">Orders</p>
            </NavLink>
          </motion.div>
        </motion.div>
      </motion.div>

      <Outlet />
    </>
  );
};

export default Sidebar;

import { menu_list } from "../assets/frontend_assets/assets";
import { motion } from "framer-motion";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-5 px-6 md:px-12">
      {/* Title */}
      <h1 className="font-medium text-zinc-600 text-xl sm:text-2xl md:text-3xl">
        Explore our menu
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-600">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise. Our mission
        is to satisfy your cravings and elevate your dining experience, one
        delicious meal at a time.
      </p>

      {/* Menu Items */}
      <motion.div
        className="flex justify-start items-center gap-7 text-center my-5 overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
        }}
      >
        {menu_list.map((item, index) => (
          <motion.div
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            key={index}
            className="flex-shrink-0 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2, // Slight delay for smooth animation
              ease: "easeInOut",
            }}
          >
            <img
              className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full ${
                item.menu_name === category
                  ? "border-orange-400 p-1 border-[3px]"
                  : ""
              }`}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p className="mt-2 text-sm sm:text-base">{item.menu_name}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Divider */}
      <hr className="my-3 h-[1px] bg-slate-100 rounded-lg" />
    </div>
  );
};

export default ExploreMenu;

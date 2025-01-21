import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/foodSlice";

const FoodItem = ({ id, name, description, price, image }) => {
  const { cartItems } = useSelector((state) => state.food);
  const dispatch = useDispatch();

  // Get item count from Redux state
  const itemCount = cartItems[id] || 0;

  return (
    <motion.div
      className="m-auto w-full cursor-pointer rounded-lg shadow-md bg-white"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Image Section */}
      <div className="relative rounded-t-lg overflow-hidden">
        <motion.img
          className="w-full h-[200px] sm:h-[250px] object-cover"
          src={image}
          alt={name}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Item Count Controls */}
        <motion.div
          className="absolute bottom-3 right-3 bg-white bg-opacity-40 p-2 rounded-sm flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          {itemCount > 0 ? (
            <>
              <motion.img
                onClick={() => dispatch(removeFromCart(id))}
                src={assets.remove_icon_red}
                alt="remove"
                className="w-6 h-6 cursor-pointer"
                whileTap={{ scale: 0.9 }}
              />
              <motion.p
                className="font-medium text-lg text-gray-800"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                {itemCount}
              </motion.p>
              <motion.img
                onClick={() => dispatch(addToCart(id))}
                src={assets.add_icon_green}
                alt="add"
                className="w-6 h-6 cursor-pointer"
                whileTap={{ scale: 0.9 }}
              />
            </>
          ) : (
            <motion.img
              src={assets.add_icon_white}
              onClick={() => dispatch(addToCart(id))}
              alt="add"
              className="w-8 h-8 cursor-pointer"
              whileTap={{ scale: 0.9 }}
            />
          )}
        </motion.div>
      </div>

      {/* Details Section */}
      <div className="p-4">
        {/* Name and Rating */}
        <div className="flex items-center justify-between mb-3">
          <p className="font-medium text-lg text-gray-800 truncate">{name}</p>
          <motion.img
            className="w-20 h-5 object-contain"
            src={assets.rating_starts}
            alt="rating"
            whileHover={{ scale: 1.1 }}
          />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 truncate">{description}</p>

        {/* Price */}
        <motion.p
          className="text-lg font-semibold text-orange-500"
          whileHover={{ scale: 1.1, color: "#f97316" }}
        >
          ${price}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default FoodItem;

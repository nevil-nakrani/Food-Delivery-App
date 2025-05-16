import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import FoodItem from "./FoodItem";


const FoodDisplay = ({ category }) => {
  const { food_list } = useSelector((state) => state.food);
  console.log(food_list);

  return (
    <div className="mt-8 px-6 md:px-12">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
        Top dishes near you
      </h2>

      {/* Food items container with scroll-triggered opacity animation */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 gap-7"
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {food_list &&
          food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }} // Start with opacity 0 and a slight downward position
                  whileInView={{ opacity: 1, y: 0 }} // Animate to opacity 1 and move to position 0 when in view
                  viewport={{ once: true, amount: 0.01 }} // Trigger animation once when 20% of the element is in view
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1, // Stagger delay for each item
                    ease: "easeInOut",
                  }}
                >
                  <FoodItem
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                  />
                </motion.div>
              );
            }
          })}
      </motion.div>
    </div>
  );
};

export default FoodDisplay;

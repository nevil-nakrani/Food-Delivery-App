import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="relative w-full my-6 mx-auto h-[85vw] md:h-[34vw] bg-cover bg-no-repeat bg-center bg-[url('./header_img.png')]">
      <motion.div
        className="absolute inset-0 flex flex-col justify-end items-start px-6 md:px-12 lg:pl-[6vw] pb-8 md:pb-12 text-white bg-gradient-to-t from-black/70 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
        }}
      >
        {/* Headline */}
        <motion.h2
          className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug md:leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        >
          Order your favourite food here
        </motion.h2>

        {/* Description */}
        <motion.p
          className="mt-3 text-xs md:text-sm lg:text-base max-w-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: "easeInOut",
          }}
        >
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </motion.p>

        {/* Button */}
        <motion.button
          className="mt-5 px-5 py-2 text-xs md:text-sm lg:text-base bg-orange-500 hover:bg-orange-600 rounded-md shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{
            scale: 1.1,
          }}
          transition={{
            duration: 2,
            type: "spring",
            stiffness: 300,
          }}
        >
          View Menu
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Header;

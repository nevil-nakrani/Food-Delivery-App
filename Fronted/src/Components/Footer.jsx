import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-1 md:grid-cols-3 gap-10 my-10 mt-40 text-sm">
        {/* Footer Content */}
        <div className="flex flex-col items-center md:items-start">
          <img src={assets.logo} alt="Logo" className="w-32 mb-5" />
          <p className="w-full md:w-2/3 text-center md:text-left leading-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere
            facilis omnis maxime ducimus tempore laborum quia impedit,
            laudantium rerum, qui libero doloribus fuga vitae asperiores saepe
            quisquam, magni inventore. Quibusdam.
          </p>
          <div className="flex gap-4 justify-center md:justify-start mt-4">
            <img src={assets.twitter_icon} alt="twitter" className="w-6" />
            <img src={assets.facebook_icon} alt="facebook" className="w-6" />
            <img src={assets.linkedin_icon} alt="linkedin" className="w-6" />
          </div>
        </div>

        {/* Company Section */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-medium mb-5">COMPANY</h2>
          <ul className="flex flex-col gap-2 cursor-pointer">
            <li>
              <NavLink to="/" className="hover:text-orange-500">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-orange-500">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/delivery" className="hover:text-orange-500">
                Delivery
              </NavLink>
            </li>
            <li>
              <NavLink to="/privacy-policy" className="hover:text-orange-500">
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Get in Touch Section */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-medium mb-5">GET IN TOUCH</h2>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 1234567890</li>
            <li>contact@me.com</li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-600" />

      <p className="text-center text-sm text-gray-900 py-5">
        Copyright 2025 @ Tomato.com - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;

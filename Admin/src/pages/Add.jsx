import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddFood() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("category", category);
    formdata.append("price", price);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/food/add",
        formdata
      );
      if (data.success) {
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setImage(false);
        toast.success("Food Added Successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-lg ml-12 p-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 my-1">
        Add Food
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Upload Image */}
        <div>
          <p className="text-gray-700 font-medium">Upload Image</p>
          <label htmlFor="image" className="cursor-pointer block w-32 my-1">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload"
              className="w-full"
            />
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            id="image"
            hidden
            required
          />
        </div>

        {/* Product Name */}
        <div>
          <p className="text-gray-700 font-medium my-1">Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <p className="text-gray-700 font-medium my-1">Product Description</p>
          <textarea
            name="description"
            rows="4"
            placeholder="Write content here"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>

        {/* Product Category & Price */}
        <div className="flex justify-between gap-4">
          <div className="w-1/2">
            <p className="text-gray-700 font-medium my-1">Product Category</p>
            <select
              name="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
            >
              <option value="">Select</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="w-1/2">
            <p className="text-gray-700 font-medium my-1">Product Price</p>
            <input
              type="number"
              name="price"
              placeholder="$20"
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-[tomato] text-white font-semibold rounded-sm hover:bg-red-600 transition duration-300"
        >
          ADD
        </button>
      </form>
    </div>
  );
}

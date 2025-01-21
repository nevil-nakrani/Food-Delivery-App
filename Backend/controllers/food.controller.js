import { v2 as cloudinary } from "cloudinary";
import Food from "../models/food.model.js";

export const addFood = async (req, res) => {
  try {
    const imageFile = req.file;
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category || !imageFile) {
      return res.status(404).json({ message: "Require all the fields" });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      folder: "Swiggy",
      resource_type: "auto",
    });

    const imageUrl = imageUpload.secure_url;

    const food = new Food({
      name,
      description,
      price,
      category,
      image: imageUrl,
    });

    await food.save();
    return res.status(201).json({ food });
  } catch (error) {
    res.status(501).json({ message: "Food Add server error" });
    console.log(error);
  }
};

export const listFood = async (req, res) => {
  try {
    const food_list = await Food.find();
    res.status(200).json({ food_list });
  } catch (error) {
    res.status(500).json({ message: "Food not fetching from the server" });
  }
};

const getPublicIdFromUrl = (imageUrl) => {
  const parts = imageUrl.split("/");
  const publicIdWithExtension = parts
    .slice(parts.indexOf("upload") + 1)
    .join("/");
  return publicIdWithExtension.replace(/\.[^/.]+$/, ""); // Remove file extension
};

export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    await cloudinary.uploader.destroy(getPublicIdFromUrl(food.image));
    await Food.findByIdAndDelete(id);

    return res.status(200).json({ message: "Food deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Food delete server error" });
  }
};

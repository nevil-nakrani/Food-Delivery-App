import { Router } from "express";
const route = Router();
import { addFood, listFood, deleteFood } from "../controllers/food.controller.js";
import upload from "../middlewares/multer.middleware.js";

route.post("/add", upload.single("image"), addFood);
route.get("/", listFood);
route.delete("/:id", deleteFood)

export default route;

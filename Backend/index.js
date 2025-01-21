import "dotenv/config";
import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import foodRouter from "./routes/food.route.js";
import connetDb from "./database/connectDb.js";
import connectCloudinary from "./config/cloudinary.js";

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/user", userRouter);
app.use("/food", foodRouter);

app.listen(PORT, () => {
  connectCloudinary();
  connetDb();
  console.log(`Server is listening on port ${PORT}`);
});

import "dotenv/config";
import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routers/user.router.js";
import connetDb from "./database/connectDb.js";

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello, Mehul \n I am Fine");
});

app.listen(PORT, () => {
  connetDb();
  console.log(`Server is listening on port ${PORT}`);
});

import { Router } from "express";
import { placeOrder } from "../controllers/order.controller.js";
import { getOrder } from "../controllers/order.controller.js";
import { listAll } from "../controllers/order.controller.js";
import { updateStatus } from "../controllers/order.controller.js";
const route = Router();

route.post("/place", placeOrder);
route.get("/", getOrder);
route.get("/all", listAll);
route.post("/status", updateStatus)

export default route;

import { Router } from "express";

import { createPayment } from "../controllers/payment.controller.js";

const route = Router();

route.post("/create", createPayment);
export default route;

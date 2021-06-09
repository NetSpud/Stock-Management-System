import express from "express";
const router = express.Router();

import itemRoute from "./item";
import userRoute from "./user";

router.use("/item", itemRoute);
router.use("/user", userRoute);

export default router;

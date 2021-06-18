import express from "express";
const router = express.Router();
import { loggedIn, adminAccess } from "../utils/middlewares";
import csurf from "csurf";
router.get("/", loggedIn, csurf(), (req, res) => {
  res.render("admin", {
    csrf: req.csrfToken(),
    level: req.session.accountLevel,
    email: req.session.email,
  });
});
router.get("/logout", loggedIn, (req, res) => {
  req.session.destroy((err) => {
    res.send(err);
  });
});

import apiRoute from "../api";
import itemRoute from "./item";
import userRoute from "./user";
import bookingsRoute from "./booking";
router.use("/api", loggedIn, apiRoute);
router.use("/item", loggedIn, itemRoute);
router.use("/user", loggedIn, adminAccess, userRoute);
router.use("/bookings", loggedIn, bookingsRoute);

export default router;

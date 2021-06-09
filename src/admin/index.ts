import express from "express";
const router = express.Router();
import { loggedIn } from "../utils/middlewares";
import csurf from "csurf";
router.get("/", loggedIn, csurf(), (req, res) => {
  res.render("admin", {
    csrf: req.csrfToken(),
  });
});
router.get("/logout", loggedIn, (req, res) => {
  req.session.destroy((err) => {
    res.send(err);
  });
});

import apiRoute from "../api";
import itemRoute from "./item";
router.use("/api", apiRoute);
router.use("/item", itemRoute);

export default router;

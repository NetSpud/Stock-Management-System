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

router.get("/item", csurf(), (req, res) => {
  res.render("item", {
    csrf: req.csrfToken(),
  });
});

import apiRoute from "../api";
router.use("/api", apiRoute);

export default router;

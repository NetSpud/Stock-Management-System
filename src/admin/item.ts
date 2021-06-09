import express from "express";
const router = express.Router();
import csurf from "csurf";

router.get("/", csurf(), (req, res) => {
  res.render("item", {
    csrf: req.csrfToken(),
  });
});

router.get("/edit/:id", csurf(), (req, res) => {
  res.render("itemEdit", {
    csrf: req.csrfToken(),
  });
});

export default router;

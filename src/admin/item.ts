import express from "express";
const router = express.Router();
import csurf from "csurf";

router.get("/", csurf(), (req, res) => {
  res.render("item", {
    csrf: req.csrfToken(),
    email: req.session.email,
  });
});

router.get("/edit/:id", csurf(), (req, res) => {
  res.render("itemEdit", {
    csrf: req.csrfToken(),
    email: req.session.email,
  });
});

export default router;

import express from "express";
const router = express.Router();
import csurf from "csurf";

router.get("/", csurf(), (req, res) => {
  res.render(`bookings`, {
    csrf: req.csrfToken(),
    email: req.session.email,
  });
});

export default router;

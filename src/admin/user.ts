import express from "express";
const router = express.Router();
import csurf from "csurf";
import User from "../api/v1/classes/user";
router.get("/", csurf(), (req, res) => {
  res.render("user", {
    csrf: req.csrfToken(),
    email: req.session.email,
  });
});

router.post("/invite", (req, res) => {
  const user = new User();

  user
    .exists(req.body.email)
    .then(() => {
      return user.invite(req.body.email);
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => res.json({ err: String(err) }));
});

export default router;

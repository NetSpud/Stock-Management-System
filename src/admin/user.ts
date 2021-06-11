import express from "express";
const router = express.Router();
import csurf from "csurf";
import User from "../api/v1/classes/user";
import { adminAccess } from "../utils/middlewares";
router.get("/", csurf(), adminAccess, (req, res) => {
  res.render("user", {
    csrf: req.csrfToken(),
  });
});

router.post("/invite", adminAccess, (req, res) => {
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

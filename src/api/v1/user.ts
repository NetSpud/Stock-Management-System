import express from "express";
const router = express.Router();
import User from "./classes/user";
router.get("/all", (req, res) => {
  const user = new User();
  user.all.then((d) => {
    res.json(d);
  });
});
router.get("/create", (req, res) => {
  const user = new User();
  if (req.session.accountLevel === 2) {
    const { email, password } = req.body;
    user
      .hash(password)
      .then((hash) => {
        return user.create(email, hash);
      })
      .then(() => {
        res.json({ success: true });
      })
      .catch((err) => res.json({ error: String(err) }));
  }
});

export default router;

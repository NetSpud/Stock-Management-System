import express from "express";
const router = express.Router();

import Item from "./classes/item";

router.post("/new", (req, res) => {
  const item = new Item(req.session.userID);
  const { name, quantity } = req.body;
  item
    .create(name, quantity)
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => res.json({ err: String(err) }));
});
router.get("/all", (req, res) => {
  const item = new Item(req.session.userID);

  item.all
    .then((d) => {
      res.json(d);
    })
    .catch((err) => res.json({ err: String(err) }));
});
router.get("/single/:id", (req, res) => {
  const item = new Item(req.session.userID);
  item
    .single(req.params.id)
    .then((d) => {
      console.log(d);
      res.json(d);
    })
    .catch((err) => res.json({ err: String(err) }));
});
router.put("/update", (req, res) => {
  const item = new Item(req.session.userID);
  item
    .update(req.body.id, req.body.name, req.body.quantity)
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => res.json({ err: String(err) }));
});
router.delete("/delete", (req, res) => {
  const item = new Item(req.session.userID);

  item
    .delete(req.body.id)
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => res.json({ err: String(err) }));
});

export default router;

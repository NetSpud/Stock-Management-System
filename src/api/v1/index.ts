import express from "express";
const router = express.Router();
import con from "../../utils/SQL";
import { v4 as uuidv4 } from "uuid";

class Item {
  _userID: string;

  constructor(userID: string) {
    this._userID = userID;
  }
  create(name: string, quantity: string) {
    return new Promise((resolve, reject) => {
      var sql =
        "INSERT INTO item (id, name, quantity, userID) VALUES (?,?,?,?)";
      con.query(
        sql,
        [uuidv4(), name, quantity, this._userID],
        (err, result) => {
          if (err) reject(err);
          console.log("1 item inserted");
          resolve(true);
        }
      );
    });
  }
  delete(itemID: string) {
    return new Promise((resolve, reject) => {
      var sql = "DELETE FROM item where id = ? and userID = ?";
      con.query(sql, [itemID, this._userID], (err, result) => {
        if (err) reject(err);
        if (result.affectedRows > 0) {
          resolve(true);
        } else {
          reject(`Something went wrong while trying to delete the item. `);
        }
      });
    });
  }
  get all() {
    return new Promise<{ id: string; name: string; quantity: string }>(
      (resolve, reject) => {
        con.query(
          "SELECT * FROM item where userID = ?",
          [this._userID],
          (err, result, fields) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      }
    );
  }
}

router.post("/new", (req, res) => {
  const item = new Item(req.session.userID);
  const { name, quantity } = req.body;
  item.create(name, quantity).then((d) => {
    res.send(d);
  });
});
router.get("/item/all", (req, res) => {
  const item = new Item(req.session.userID);

  item.all.then((d) => {
    res.json(d);
  });
});
router.get("/delete", (req, res) => {
  const item = new Item(req.session.userID);

  item.delete(`347db4ac-d17f-44c1-8836-00ebd30618f8`).then((d) => {
    res.json(d);
  });
});

export default router;

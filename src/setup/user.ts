import express from "express";
const router = express.Router();
import csurf from "csurf";
import User from "../api/v1/classes/user";
import con from "../utils/SQL";

const validInvite = (code: string) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM userinvites where code = ?",
      [code],
      (err, result) => {
        if (err) reject(err);
        if (result.length > 0) {
          resolve(true);
        } else {
          reject(`Invalid code`);
        }
      }
    );
  });
};

router.get("/join/:id", csurf(), (req, res) => {
  validInvite(req.params.id)
    .then(() => {
      res.render("addUser", {
        csrf: req.csrfToken(),
      });
    })
    .catch((err) => res.json({ err: String(err) }));
});

router.post("/create", csurf(), (req, res) => {
  console.log(`/setup/user/create`);
  const user = new User();

  const getEmail = (code: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      con.query(
        "SELECT * FROM userinvites where code = ?",
        [code],
        (err, result) => {
          if (err) reject(err);
          if (result.length > 0) {
            resolve(result[0].email);
          }
        }
      );
    });
  };

  const deleteInvite = (code: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM userinvites where code = ?";
      con.query(sql, [code], (err) => {
        if (err) reject(err);
        console.log("user invite deleted");
        resolve(true);
      });
    });
  };

  validInvite(req.body.code)
    .then(() => {
      return Promise.all([
        user.hash(req.body.password),
        getEmail(req.body.code),
      ]);
    })
    .then((data) => {
      return user.create(data[1], data[0], "1");
    })
    .then(() => {
      return deleteInvite(req.body.code);
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => res.json({ err: String(err) }));
});

export default router;

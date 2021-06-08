import express from "express";
const router = express.Router();
import csurf from "csurf";
import con from "./utils/SQL";
import bcrypt from "bcrypt";
router.get("/", csurf(), (req, res) => {
  res.render("login", {
    csrf: req.csrfToken(),
  });
});

router.post("/", csurf(), (req, res) => {
  const queryDB = (email: string) => {
    return new Promise<{
      id: string;
      email: string;
      password: string;
      accountLevel: boolean;
    }>((resolve, reject) => {
      con.query(
        "SELECT id, email, password, accountLevel FROM users where email = ?",
        [email],
        (err, result, fields) => {
          if (err) reject(err);
          if (result.length > 0) {
            resolve(result[0]);
          }
        }
      );
    });
  };

  const startSession = (email: string) => {
    return new Promise((resolve, reject) => {
      con.query(
        "SELECT id, email, password, accountLevel FROM users where email = ?",
        [email],
        (err, result, fields) => {
          if (err) reject(err);
          if (result.length > 0) {
            req.session.userID = result[0].id;
            req.session.email = result[0].email;
            req.session.accountLevel = result[0].accountLevel;
            resolve(true);
          }
        }
      );
    });
  };

  queryDB(req.body.email)
    .then((d) => {
      return bcrypt.compare(req.body.password, d.password);
    })
    .then((d) => {
      if (!d) {
        res.json({ err: `Invalid or incorrect details` });
      } else {
        return startSession(req.body.email);
      }
    })
    .then(() => {
      res.json({
        success: "/admin",
      });
    });
});

export default router;

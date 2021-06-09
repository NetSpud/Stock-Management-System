import express from "express";
import testSQL from "./testSQL"; //ensure can access mySQL
import testFS from "./testFS"; //test FS permissions
import csurf from "csurf";
import createTables from "./createTables";
import bcrypt from "bcrypt";
import con from "../utils/SQL";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";

const router = express.Router();

const runSetup = () => {
  return new Promise((resolve) => {
    fs.access("./setup", fs.constants.F_OK, (err) => {
      if (err) resolve(false);
      resolve(true);
    });
  });
};

const createSetupFile = () => {
  return new Promise((resolve, reject) => {
    fs.appendFile(
      "./setup",
      "DO NOT DELETE\nTHIS FILE PREVENTS THE SETUP CONFIG FROM RUNNING AGAIN BEFORE THE DATABASE IS CONFIGURED!\nAlthough... If you want to run the setup again, by all means delete this file :)",
      (err) => {
        if (err) reject(err);
        console.log("Saved!");
        resolve(true);
      }
    );
  });
};

router.get("/", csurf(), async (req, res) => {
  runSetup().then((d) => {
    console.log(d);
    console.log(d);
    console.log(d);
    if (d === false) {
      req.session.setup = true;
      req.session.save();
    }
  });

if (req.session.setup) {
    Promise.all([testSQL(), testFS()])
      .then((d) => {
        res.render("setup", {
          SQL: d[0],
          FS: d[1],
          csrf: req.csrfToken(),
        });
      })
      .catch((err) => res.send(err));
  }
});
router.post("/start", csurf(), (req, res) => {
  createTables()
    .then(() => {
      res.json({
        success: "/setup/finish",
      });
    })
    .then(() => {
      req.session.setup = false;
      req.session.save();
      createSetupFile();
    })
    .catch((err) => res.send(err));
});

router.get("/finish", csurf(), (req, res) => {
  const checkAdminExists = () => {
    return new Promise((resolve, reject) => {
      con.query(
        "SELECT * FROM users where accountLevel = 2",
        (err, result) => {
          if (err) reject(err);
          if (result.length > 0) {
            res.redirect("/login");
          } else {
            resolve(false);
          }
        }
      );
    });
  };

  checkAdminExists()
    .then((d) => {
      if (!d) {
        res.render("addAdmin", {
          csrf: req.csrfToken(),
        });
      }
    })
    .catch((err) => res.send(err));
});
router.post("/finish", csurf(), (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ err: `Data invalid` });
    return;
  }

  const createAccount = (id: string, email: string, hash: string) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO users (id, email, password, verificationCode, accountLevel, verified) VALUES (?,?,?,?,?,?)";
      con.query(sql, [id, email, hash, null, 2, 1], (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  };
  const saltRounds = 10;
  bcrypt
    .hash(req.body.password, saltRounds)
    .then((hash) => {
      return createAccount(uuidv4(), req.body.email, hash);
    })
    .then(() => {
      console.log(`Admin Account Created Successfully`);
      res.json({ success: true });
    });
});

export default router;

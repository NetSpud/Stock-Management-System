import express from "express";
import testSQL from "./testSQL";
import testFS from "./testFS";
import csurf from "csurf";
import createTables from "./createTables";
const router = express.Router();

router.get("/windows", csurf(), async (req, res) => {
  Promise.all([testSQL(), testFS()])
    .then((d) => {
      res.render("winSetup", {
        SQL: d[0],
        FS: d[1],
        csrf: req.csrfToken(),
      });
    })
    .catch((err) => res.send(err));
});
router.post("/windows/start", csurf(), (req, res) => {
  createTables();
});
export default router;

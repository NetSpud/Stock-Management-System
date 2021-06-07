import express from "express";
import dotenv from "dotenv";
import session from "express-session";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "pug");
app.use(
  session({
    secret: "123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    name: `_session`,
  })
);

declare module "express-session" {
  export interface Session {
    setup: boolean;
  }
}

import adminRoute from "./admin";
import setupRoute from "./setup";
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.sendStatus(200);
  console.log(req.session);
});

app.use("/setup", setupRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`System running on port ${port}`);
});

import { Request, Response, NextFunction } from "express";
const loggedIn = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session.userID) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export { loggedIn };

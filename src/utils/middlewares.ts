import { Request, Response, NextFunction } from "express";
const loggedIn = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session.userID) {
    return next();
  } else {
    return res.redirect("/login?redirect=" + req.originalUrl);
  }
};

const adminAccess = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session.accountLevel === 2) {
    return next();
  } else {
    res.redirect("/admin?accessDenied=true");
  }
};

export { loggedIn, adminAccess };

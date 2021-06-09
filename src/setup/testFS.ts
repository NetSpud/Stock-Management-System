import * as fs from "fs";
import * as path from "path";

export default (): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.access(path.resolve("./"), fs.constants.F_OK, (err) => {
      if (err) reject(err);
      else resolve("Permissions Valid!");
    });
  });
};
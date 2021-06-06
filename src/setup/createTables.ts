import con from "../utils/SQL";
const createUsers = () => {
  return new Promise((resolve, reject) => {
    var sql = `
    CREATE TABLE users (
	id VARCHAR(255),
	username VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255),
	verificationCode VARCHAR(255),
	accountLevel INT,
	verified BOOLEAN,
	PRIMARY KEY (id)
);`;
    con.query(sql, (err, result) => {
      if (err) reject(err);
      console.log("Users Table Created");
      resolve(true);
    });
  });
};
const createItem = () => {
  return new Promise((resolve, reject) => {
    var sql = `
    CREATE TABLE item (
	id VARCHAR(255),
	name VARCHAR(255),
	quantity VARCHAR(255),
	userID VARCHAR(255),
	PRIMARY KEY (id)
);`;
    con.query(sql, (err, result) => {
      if (err) reject(err);
      console.log("Item Table Created");
      resolve(true);
    });
  });
};

/*


CREATE TABLE `users` (
	`id` VARCHAR(255),
	`username` VARCHAR(255),
	`email` VARCHAR(255),
	`password` VARCHAR(255),
	`verificationCode` VARCHAR(255),
	`accountLevel` INT,
	`verified` BOOLEAN,
	PRIMARY KEY (`id`)
);



*/

export default () => {
  Promise.all([createUsers(), createItem()])
    .then((d) => {})
    .catch((err) => console.log(err));
};

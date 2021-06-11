import con from "../utils/SQL";
const createUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = `
  CREATE TABLE IF NOT EXISTS users (
	id VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255),
	verificationCode VARCHAR(255),
	accountLevel INT,
	verified BOOLEAN,
	PRIMARY KEY (id)
);`;
    con.query(sql, (err) => {
      if (err) reject(err);
      console.log("Users Table Created");
      resolve(true);
    });
  });
};
const createItem = () => {
  return new Promise((resolve, reject) => {
    const sql = `
  CREATE TABLE IF NOT EXISTS item (
	id VARCHAR(255),
	name VARCHAR(255),
	quantity VARCHAR(255),
	userID VARCHAR(255),
	PRIMARY KEY (id)
);`;
    con.query(sql, (err) => {
      if (err) reject(err);
      console.log("Item Table Created");
      resolve(true);
    });
  });
};
const createSessions = () => {
  return new Promise((resolve, reject) => {
    const sql = `
  CREATE TABLE IF NOT EXISTS sessions (
  session_id varchar(128) COLLATE utf8mb4_bin NOT NULL,
  expires int(11) unsigned NOT NULL,
  data mediumtext COLLATE utf8mb4_bin,
  PRIMARY KEY (session_id)
);`;
    con.query(sql, (err) => {
      if (err) reject(err);
      console.log("Sessions Table Created");
      resolve(true);
    });
  });
};

const createInvites = () => {
  return new Promise((resolve, reject) => {
    const sql = `
  CREATE TABLE userInvites (
	id VARCHAR(255),
	email VARCHAR(255),
	timeInvited VARCHAR(255),
	code VARCHAR(255),
	PRIMARY KEY (id)
);`;

    con.query(sql, (err) => {
      if (err) reject(err);
      console.log("Sessions Table Created");
      resolve(true);
    });
  });
};
const createBookings = () => {
  return new Promise((resolve, reject) => {
    const sql = `
  CREATE TABLE bookings (
	id VARCHAR(255),
	items TEXT,
	using_from VARCHAR(255),
	using_until TEXT(255),
	userID VARCHAR(255),
	PRIMARY KEY (id)
);`;

    con.query(sql, (err) => {
      if (err) reject(err);
      console.log("Bookings Table Created");
      resolve(true);
    });
  });
};

export default (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Promise.all([
      createUsers(),
      createItem(),
      createSessions(),
      createInvites(),
      createBookings(),
    ])
      .then(() => {
        resolve(true);
      })
      .catch((err) => reject(err));
  });
};

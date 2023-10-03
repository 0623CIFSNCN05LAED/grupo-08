const db = require("../data/db");

const usersServices = {
  getAllUsers: () => {
    return db.users.showAll();
  },
  create: (user) => {
    db.users.create(user);
  },
};

module.exports = usersServices;

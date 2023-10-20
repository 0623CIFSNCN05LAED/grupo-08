const db = require("../data/db");

const usersServices = {
  getAllUsers: () => {
    return db.users.showAll();
  },

  getUser: () => {
    const user = db.users.findById(id);
    return user;
  },

  create: (user) => {
    db.users.create(user);
  },
};

module.exports = usersServices;

const db = require("../data/db");

const usersServices = {
  getAllUsers: () => {
    return db.users.showAll();
  },

  getUser: (id) => {
    const users = db.users.findById(id);
    return users;
  },

  create: (user) => {
    db.users.create(user);
  },
};

module.exports = usersServices;

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

  updateUser: (id, user) => {
    db.users.update(id, user);
  },

  deleteUser: (id) => {
    db.users.delete(id);
  },
};

module.exports = usersServices;

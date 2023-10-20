// USERS - CREATE SAVE MODIFY DELETE ID
const fs = require("fs");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

module.exports = {
  getUsers: function () {
    const usersFilePath = path.join(__dirname, "./usersDataBase.json");
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    return users;
  },

  saveUsers: function (users) {
    const usersFilePath = path.join(__dirname, "./usersDataBase.json");
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2)); // escribo la base de datos
    return users;
  },

  showAll: function () {
    return this.getUsers();
  },

  findById: function (id) {
    const users = this.getUsers().find((user) => user.id == id);
    return users;
  },

  create: function (user) {
    // aca crea el usuario
    console.log(`Creating user ${user.first_name}`);
    const users = this.getUsers(); // traigo todos los Usuarios
    const newUser = {
      id: uuidv4(),
      ...user,
    };
    users.push(newUser); // push con los nuevos datos
    this.saveUsers(users); // Graba Usuario nuevo
  },
};

// USERS - CREATE SAVE MODIFY DELETE ID
const fs = require("fs");
const path = require("path");

const { v4: uuidv4 } = require("uuid");
const { users } = require("../db");
const { log } = require("console");

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
    const users = this.getUsers().find((users) => users.id == id);
    return users;
  },

  findByfield: function (field, text) {
    const user = this.getUsers().find((user) => user[field] === text);
    return user;
  },

  create: function (user) {
    // crea el usuario
    console.log(`Creating user ${user.first_name}`);
    const users = this.getUsers(); // traigo todos los Usuarios
    const newUser = {
      id: uuidv4(),
      ...user,
    };
    users.push(newUser); // push con los nuevos datos
    this.saveUsers(users); // Graba Usuario nuevo
  },

  update: function (id, user) {
    console.log(`Updating user ${user.first_name}`);
    //cargo todos los productos
    const users = this.getUsers();
    // busco producto por id
    const userToEdit = users.find((user) => user.id == id);
    // piso las propiedades

    //Object.assign(userToEdit, user); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

    userToEdit.first_name = user.first_name;
    userToEdit.last_marca = user.last_name;
    userToEdit.email = user.email;
    userToEdit.birth_date = user.birth_date;
    userToEdit.gender = user.gender;
    // guardo los usuarios
    this.saveUsers(users);
    return user;
  },

  delete: function (id) {
    console.log(`Deleting user with name ${first_name}`);
    const users = this.getUsers();
    const nonDeletedUsers = users.filter((user) => user.id != id);
    this.saveUsers(nonDeletedUsers);
  },
};

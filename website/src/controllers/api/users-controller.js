const usersService = require("../../services/users-service");

module.exports = {
  count: async (req, res) => {
    const pageSize = 5;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * pageSize;
    const { count, rows } = await usersService.getAllUsersAndCount({
      pageSize,
      offset,
    });
    res.json({
      meta: {
        status: 200,
        total: count,
        url: req.originalUrl,
        nextPage: `${req.originalUrl.split("?")[0]}?page=${page + 1}`,
      },
      data: rows,
    });
  },

  detailById: async (req, res) => {
    const user = await usersService.getUserById(req.params.id);
    res.json({
      meta: {
        status: 200,
        total: user.length,
        url: req.originalUrl,
      },
      data: user,
    });
  },

  create: async (req, res) => {
    user = await usersService.createUser(req.body, req.file);
    res.json({
      meta: {
        status: 201,
        total: user.length,
        url: req.originalUrl,
      },
      data: user,
    });
  },

  update: async (req, res) => {
    await usersService.updateUser(req.params.id, req.body);
    res.json({
      meta: {
        status: 201,
        total: user.length,
        url: req.originalUrl,
      },
      data: user,
    });
  },

  destroy: async (req, res) => {
    await usersService.deleteUser(req.params.id);
    res.json({
      meta: {
        status: 200,
        total: user.length,
        url: req.originalUrl,
      },
    });
  },
};

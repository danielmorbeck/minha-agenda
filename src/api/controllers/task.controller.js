let Task = require('../models/task.model');

class TaskController {
  async index (req, res, next) {
    try {
      const tasks = await Task.find({});
      return res.status(200).send(tasks);
    } catch (e) {
      console.log(e);
      return res.status(500).send();
    }
  }

  async store (req, res, next) {
    try {
      req.body.user = req.userId;
      const task = await Task.create(req.body);
      return res.status(200).send(task);
    } catch (e) {
      console.log(e);
      return res.status(500).send();
    }
  }
};

module.exports = TaskController;
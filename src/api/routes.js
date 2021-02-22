const express = require('express');
const router = express.Router();
const TaskController = require('./controllers/task.controller');

const taskController = new TaskController;

//TASKS:

//GET: /tasks
router.get('/tasks', taskController.index);

// POST: /tasks
router.post('/tasks', taskController.store);

module.exports = router;

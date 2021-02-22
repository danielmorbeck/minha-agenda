const express = require('express');
const router = express.Router();
const TaskController = require('./controllers/task.controller');
const UserController = require('./controllers/user.controller');
const AuthController = require('./controllers/auth.controller');

const taskController = new TaskController;
const userController = new UserController;
const authController = new AuthController;

//TASKS:

//GET: /tasks
router.get('/tasks', taskController.index);
// POST: /tasks
router.post('/tasks', taskController.store);

//USER: 

//GET: /users
router.get('/users', userController.index);
// POST: /users/register
router.post('/users/register', authController.register);
// POST: /users/login
router.post('/users/login', authController.login);

module.exports = router;

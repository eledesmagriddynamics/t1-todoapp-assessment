const express = require('express');
const todoController = require('../controllers/todoController');
const router = express.Router();

router.get('/todo', todoController.getTodos);

router.post('/todo', todoController.addTodo);

router.put('/todo/:idTodo', todoController.editTodo);

router.delete('/todo/:idTodo', todoController.deleteTodo);

module.exports = router ;
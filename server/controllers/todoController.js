const fs = require('fs/promises');

const errors = {
    emptyValues: 'Empty values not accepted',
    wrongRequest: 'Wrong body request'
};

const readTodos = async () => {
    console.log('readTodos');
    try {
        const response = await fs.readFile('./data/todos.json', {
            encoding: 'utf8',
        });
        let data = [];

        if (response !== '') {
            data = JSON.parse(response);
        }

        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error readTodos fn', error);
    }
};

const getTodos = async (req, res, next) => {
    console.log('👀 getTodos');
    try {
        const data = await readTodos();

        return res.json({ data });
    } catch (error) {
        console.error('Error getTodos', error);
        throw new Error('Error getTodos', error);
    }
};

const addTodo = async (req, res, next) => {
    console.log('➕ addTodo');
    console.log('req.body: ', req.body);
    try {
        const newId = Math.round(Math.random() * 10000);
        const newTodo = req.body.todo;

        if (newTodo === '') {
            return res.status(400).json({ data: errors.emptyValues });
        }

        if (newTodo === undefined) {
            return res.status(400).json({ message: errors.wrongRequest, data: req.body });
        }

        const todo = {
            id: newId,
            todo: newTodo,
            isDone: false,
        };
        let data = await readTodos();
        data.push(todo);

        await fs.writeFile('./data/todos.json', JSON.stringify(data));

        data = await readTodos();

        return res.json({ data });
    } catch (error) {
        console.error('Error addTodo', error);
        throw new Error('Error addTodo', error);
    }
};

const editTodo = async (req, res, next) => {
    console.log('✏️ editTodo');

    try {
        const idTodo = parseInt(req.params.idTodo);
        let updateTodo;

        if (typeof req.body.todo !== 'undefined') {
            const newTodo = req.body.todo;

            if (newTodo === '') {
                return res.status(400).json({ data: errors.emptyValues });
            }

            updateTodo = {
                todo: newTodo,
            };
        } else if (typeof req.body.isDone !== 'undefined') {
            const newIsDone = req.body.isDone;

            if (newIsDone === '') {
                return res.status(400).json({ data: errors.emptyValues });
            }

            updateTodo = {
                isDone: newIsDone,
            };
        } else {
            return res.status(400).json({ message: errors.wrongRequest, data: req.body });
        }
        
        let todos = await readTodos();

        if (todos.length > 0) {
            // CHECK IF idTodo exists on todos.

            todos = todos.map((todo) => {
                if (todo.id === idTodo) {
                    return {
                        ...todo,
                        ...updateTodo,
                    };
                }

                return todo;
            });

            await fs.writeFile('./data/todos.json', JSON.stringify(todos));

            todos = await readTodos();

            return res.json({ todos });
        } else {
            return res.json({ data: 'No todos' });
        }
    } catch (error) {
        console.error('Error addTodo', error);
        throw new Error('Error addTodo', error);
    }
};

const deleteTodo = async (req, res, next) => {
    console.log('❌ deleteTodo');

    try {
        const idTodo = parseInt(req.params.idTodo);
        let todos = await readTodos();

        if (todos.length > 0) {
            // CHECK IF idTodo exists on todos.

            todos = todos.filter((todo) => todo.id !== idTodo);

            await fs.writeFile('./data/todos.json', JSON.stringify(todos));

            todos = await readTodos();

            return res.json({ todos });
        } else {
            return res.json({ data: 'No todos' });
        }
    } catch (error) {
        console.error('Error addTodo', error);
        throw new Error('Error addTodo', error);
    }
};

module.exports = { getTodos, addTodo, editTodo, deleteTodo };

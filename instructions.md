# My TODOS App Assessment

## Instructions

Create a todos app that performs the following actions:

- Display all your todos
- Create new todos
- Edit a todo
- Mark/Unmark a todo as done
- Delete a todo

## API ENPOINTS

### Get Todos
```
GET http://localhost:3000/todo
```

**Response**
```
{
    "data": [
        {
            "id": 1,
            "todo": "Go shopping",
            "isDone": false
        }
    ]
}
```

### Add todo
```
POST http://localhost:3000/todo
```
**Body Request**
|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `todo` | required | string  | The todo string value                                                                    |

### Edit todo
```
PUT http://localhost:3000/todo/{idTodo}
```
**Body Request**
|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `todo` | optional | string  | The todo string to be edited                                                                   |
|     `idDone` | optional | boolean  | The todo status to be edited                                                                  |

**Attention!!**
Only one value can be sent at once.

### Delete todo
```
DELETE http://localhost:3000/todo/{idTodo}
```
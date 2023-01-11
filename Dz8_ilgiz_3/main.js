const url = 'http://localhost:8000/todos';


const addValue = document.querySelector('.add-value');
const addBtn = document.querySelector('.add');

addBtn.addEventListener('click', () => {createTodo(addValue.value)})

const todoList = document.querySelector('.list');

/// request function for get all todos from json-server;

async function getAllTodo(url) {
    try {
        const response = await fetch(url);
        const todos = await response.json();
        showTodo(todos)
    } catch (error) {;
        console.log(error.message);
    }
}

// function for show all todos in HTML;

function showTodo(todos) {
    todos.forEach(todo => {
        // create new block for each todo;

        const todoBlock = document.createElement('div');
        todoBlock.innerHTML = `
            <div class="todo-item">
            <h2 class=${todo.completed && "done"}>${todo.title}</h2>
            <button onclick="updateTodo(${todo.id},${todo.completed})">Done</button>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `
        // append each todo to block list;
        todoList.append(todoBlock);
    });
}


getAllTodo(url)



// request functions;

/// function for delete todo;

async function deleteTodo(id) {
    try {
        await fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

// function for update todo;

async function updateTodo(id,status) {
    try {
        await fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: !status
            })
        })
    } catch (error) {
        console.log(error.message);
    }
}
async function createTodo (title) {
    console.log(title);
    try{
        await fetch(`${url}`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title
            })
        }

    } catch(e) {
        console.log(e);
    }
    
}
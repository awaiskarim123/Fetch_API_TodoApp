"use strict";

const apiUrl = 'https://jsonplaceholder.typicode.com/todos/';

fetch(apiUrl + '1')
    .then(response => response.json())
    .then(json => {
        const todoList = document.getElementById('todo-list');
        createTodoItem(todoList, json);
    });

function createTodoItem(container, todo) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('border', 'border-gray-700', 'p-2', 'flex', 'items-center', 'justify-between', 'hover:bg-gray-700', 'transition');

    const todoText = document.createElement('span');
    todoText.textContent = todo.title;

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('flex', 'gap-2');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('px-2', 'py-1', 'bg-blue-500', 'text-white', 'rounded', 'hover:bg-blue-600', 'focus:outline-none', 'focus:ring', 'focus:border-blue-300');
    editButton.addEventListener('click', () => editTodoItem(todo, todoText));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('px-2', 'py-1', 'bg-red-500', 'text-white', 'rounded', 'hover:bg-red-600', 'focus:outline-none', 'focus:ring', 'focus:border-blue-300');
    deleteButton.addEventListener('click', () => deleteTodoItem(todoItem));

    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    todoItem.appendChild(todoText);
    todoItem.appendChild(buttonsContainer);
    container.appendChild(todoItem);
}

function editTodoItem(todo, todoTextElement) {
    const newTitle = prompt('Edit Todo:', todo.title);
    if (newTitle !== null) {
        todo.title = newTitle;
        todoTextElement.textContent = newTitle;
    }
}

function deleteTodoItem(todoItem) {
    const confirmDelete = confirm('Are you sure you want to delete this todo item?');
    if (confirmDelete) {
        todoItem.remove();
    }
}

const addTodoButton = document.getElementById('add-todo');
addTodoButton.addEventListener('click', () => {
    const newTitle = prompt('Add a new todo:');
    if (newTitle !== null && newTitle.trim() !== '') {
        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({
                title: newTitle,
                completed: false
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(json => {
            const todoList = document.getElementById('todo-list');
            createTodoItem(todoList, json);
        });
    }
});

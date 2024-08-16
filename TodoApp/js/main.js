document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.querySelector('.todo_input');
    const todoList = document.querySelector('.todo_list');
    const addBtn = document.querySelector('.add_btn');

    // 초기화 시 로컬 스토리지에 저장된 항목 불러오기
    loadTodos();

    // '추가' 버튼 클릭 시 새로운 할 일 추가
    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addTodo();
    });

    // Enter 키를 눌러도 할 일 추가
    todoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTodo();
        }
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const todoItem = createTodoElement(todoText);
        todoList.appendChild(todoItem);
        saveTodos();

        todoInput.value = ''; // 입력창 초기화
    }

    function createTodoElement(text) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        //deleteBtn.innerHTML = 'X';
        deleteBtn.classList.add('delete_btn');
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTodos();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);

        return li;
    }

    function saveTodos() {
        const todos = [];
        document.querySelectorAll('.todo_list li').forEach((li) => {
            todos.push(li.querySelector('span').textContent);
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        storedTodos.forEach((todo) => {
            const todoItem = createTodoElement(todo);
            todoList.appendChild(todoItem);
        });
    }
});
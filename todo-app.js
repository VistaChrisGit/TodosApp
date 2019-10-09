const todos = [{
    text: 'Order cat food',
    completed: true
}, {
    text: 'Clean Kitchen',
    completed: false
}, {
    text: 'Buy Food',
    completed: true
}, {
    text: 'Do work',
    completed: false
}, {
    text: 'Excersize',
    completed: true
}]

const filters = {
    searchText: '',
    hideCompleted: false
}

const renderedTodos = function (todos, filters) {
    let filteredTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    filteredTodos = filteredTodos.filter(function (todo) {
        return !filters.hideCompleted || !todo.completed
    })

    const incompleteTodos = filteredTodos.filter(function (todo) { // this code returns boolean that we grab the length of later to display remaining todos
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = '' // clears the todos div before we render to it

    const summary = document.createElement('h2') 
    summary.textContent = `You have ${incompleteTodos.length} todos left.`
    document.querySelector('#todos').appendChild(summary) // displays text of how many todos are left (those that are false - because not complete)

    filteredTodos.forEach(function (todo) {
        const todoEl = document.createElement('p')
        todoEl.textContent = todo.text
        document.querySelector('#todos').appendChild(todoEl) // renders the filtered todos to the browser
    })

    
}

renderedTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', function (e) { // listens and filters todos to user based on search text entered
    filters.searchText = e.target.value
    renderedTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit', function (e) {
    e.preventDefault()    
    todos.push( { // Add new object to our todo array
        text: e.target.elements.newTodo.value,
        complete: false
    })
    renderedTodos(todos, filters) // rerenders after adding so it displays the updated array
    e.target.elements.newTodo.value = '' // clears the text are of the input text box
})

document.querySelector('#hide-completed').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked
    renderedTodos(todos, filters)
})

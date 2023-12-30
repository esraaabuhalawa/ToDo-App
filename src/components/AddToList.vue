<template>
    <main class="container my-5 ">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6 ">
                <header class="d-flex justify-content-between align-items-center mt-2 mb-2 mt-lg-5 mb-lg-4  my-md-2 py-3">
                    <h1 class="font-semibold align-self-stretch">ToDo</h1>
                    <div class="align-self-stretch" id="switcher" @click="toggleClass()">
                        <span>
                            <img src="../assets/images/icon-moon.svg" v-show="switchClass" class="w-100">
                            <img src="../assets/images/icon-sun.svg" v-show="!switchClass" class="w-100">
                        </span>

                    </div>
                </header>

                <!--Start O To Do List -->
                <section class="mb-3">
                    <div class="input-group">
                        <div class="input-group-text border-0">
                            <input class="form-check-input gradientcheck" type="checkbox" id="addTodo" @click="addTodo()">
                        </div>
                        <input type="text" id="new" class="form-control border-0" aria-label="Text input with radio button"
                            placeholder="Create a new todo ..." v-model.trim.lazy="subject" @keyup.enter="addTodo()">
                    </div>
                </section>
                <section class="list-container">
                    <draggable v-model="todos" tag="ul" class="ul-drag" group="people" @start="drag = true" @end="saveTasks">
                        <li class="list-group-item" v-for="(todo, index) in filteredTodos" :key="index">
                            <div class="ps-md-2 d-flex justify-content-start align-items-center pt-3 pb-3">
                                <div class="position-relative w-4 pe-1 checkbox">

                                    <input class="defaultExit"
                                    :class="todo.completed ? 'gradientcheck' : 'unchecked'" type="checkbox"
                                    :id="'flexCheckDefault' + { index }" v-model="todo.completed"
                                    
                                    @click="toggleCompelation(index)">
                                    
                                    <span :class=" todo.completed ? 'custom-checkmark' : 'hide-check'"
                                     @click="toggleCompelation(index)">
                                     <i class="fa-solid fa-check"></i>
                                    </span>
                                </div>
                                
                                <div class=" position-relative pt-2 todotext"
                                    :class="{ completed: todo.completed }">
                                    <p class="unbreakable me-4 editme  " contenteditable="true" @input="handleInput"
                                        @keydown.enter="endEdit()" @keyup="editTodo(todo)">
                                        {{ todo.title }}
                                    </p>
                                </div>

                                <div class="me-3 me-md-1 delete" v-show="!todo.completed">
                                    <span @click="deleteTodo(todo)" id="delete" class="d-inline-block ">
                                        <i class="fa-solid fa-xmark me-2 mt-1"></i>
                                    </span>
                                </div>

                            </div>
                        </li>
                    </draggable>
                    <ul class="secondUL">
                        <li class="list-group-item d-flex justify-content-between d-md-none p-2 pt-3 border-b-2 smallFont">
                            <div>
                                <span class="me-2 filters">{{ todoNum }} items left</span>
                            </div>
                            <div>
                                <span @click="clearComplete" class="filters">Clear Completed</span>
                            </div>
                        </li>

                        <li class="list-group-item d-none  d-md-flex justify-content-between p-2 border-b-0">
                            <div>
                                <span class="me-2 filters">{{ todoNum }} items left</span>
                            </div>
                            <div>
                                <span class="ms-2 me-3 filters" @click="visibilty = 'all'"
                                    :class="{ selected: visibilty == 'all' }">All</span>
                                <span class="me-3 filters" @click="visibilty = 'active'"
                                    :class="{ selected: visibilty == 'active' }">Active</span>
                                <span class=" filters" @click="visibilty = 'completed'"
                                    :class="{ selected: visibilty == 'completed' }">Completed</span>
                            </div>

                            <div>
                                <span @click="clearComplete" class="filters">Clear Completed</span>
                            </div>
                        </li>
                        <li
                            class="list-group-item d-flex  d-md-none justify-content-center align-items-center p-2 border-b-0 smallFont">
                            <div>
                                <span class="me-2 filters" @click="visibilty = 'all'"
                                    :class="{ selected: visibilty == 'all' }">All</span>
                                <span class="me-2 filters" @click="visibilty = 'active'"
                                    :class="{ selected: visibilty == 'active' }">Active</span>
                                <span class="filters" @click="visibilty = 'completed'"
                                    :class="{ selected: visibilty == 'completed' }">Completed</span>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
            <div class="text-center w-100">
                <p class="py-4" id="reorder">Drag and drop to reorder list</p>
            </div>
        </div>

    </main>
</template>
<script>
import draggable from 'vuedraggable'
export default {
    data() {

        return {

            dark: true,
            todoText: '',
            subject: '',
            visibilty: 'all',
            editable: '',
            edit: false,
            isActive: false,
            todos: JSON.parse(localStorage.getItem('todo-app')) || [],
            switchClass: false,
         
        }
    },
    components: {
        draggable,
    },

    methods: {
        addTodo() {
            if (this.subject != '') {
                this.todos.push({
                    title: this.subject,
                    completed: false,
                })
                this.saveTasks();
            }
        },
        deleteTodo(item) {
            this.todos.splice(this.todos.indexOf(item), 1)
            this.saveTasks();
        },
        clearComplete() {
            this.todos = this.todos.filter((item) => { return item.completed === false });
            this.saveTasks();
        },
        toggleClass() {
            var element = document.body;
            element.dataset.bsTheme =
                element.dataset.bsTheme == "light" ? "dark" : "light";
            localStorage.setItem("appliedTheme", element.dataset.bsTheme);
            this.switchClass = !this.switchClass
        },
        toggleCompelation(index) {
            this.$set(this.todos, index, {
                title: this.todos[index].title,
                completed: !this.todos[index].completed
            });

            this.saveTasks();
        },
        handleInput(e) {

            this.editable = e.target.innerText;
        },
        endEdit() {
            this.$el.querySelector('.editme').blur()
            this.saveTasks();
        },
        editTodo(todo) {
            todo.title = this.editable;
            this.saveTasks();
        },
        activeEdit() {
            this.isActive = true
        },
        saveTasks() {
            localStorage.setItem('todo-app', JSON.stringify(this.todos));
        }
    },
    computed: {
        todoNum() {
            let leftItems = this.todos.filter((item) => { return item.completed === false });
            return leftItems.length
        },
        filteredTodos() {
            let filterTodos = [];
            if (this.visibilty == 'all') {
                filterTodos = this.todos
            } else if (this.visibilty == 'active') {
                filterTodos = this.todos.filter((item) => { return !item.completed })
            } else if (this.visibilty == 'completed') {
                filterTodos = this.todos.filter((item) => { return item.completed })
            }
            return filterTodos
        }
    },
    created() {
        document.body.dataset.bsTheme = localStorage.getItem('appliedTheme') || 'light'
    },
}
</script>

<style lang="scss" scoped>
.list-container {
    border-radius: 5px;
}
.ul-drag {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.secondUL {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
.defaultExit,input[type= 'radio']{
    width: 18px;
    height: 18px;
}
.defaultExit{
    appearance: none; 
    -webkit-appearance: none; 
    -moz-appearance: none;
    border-radius: 50%;
    border: 1px solid #4e2f49; 
    vertical-align: bottom;
    outline: none; 
    cursor: pointer;
}

.hidden-check{
    top: 33%;
    right: 29%;
    z-index: 10;
    position: absolute;
    visibility: hidden;
}
.gradientcheck:checked {
    background: -o-linear-gradient(45deg, #57ddff, #c058f3);
    background: linear-gradient(45deg, #57ddff, #c058f3);
}

.todotext{
    width: 88%
}
.delete{
    width: 4%;
}
input[type="checkbox"]:hover,
#delete:hover {
    cursor: pointer;
}

input[type="checkbox"]:hover {
    border-color:  #c058f3;
}
.custom-checkmark:hover{
    cursor: pointer;
}
form-check-input:checked {
    background: none !important;
    border: none !important;
}

.gradientcheck:focus,
input[type='text'] {
    -webkit-box-shadow: none;
            box-shadow: none;
}

.form-check-input[type= 'checkbox'] {
    margin-top: 2px;
}

::-webkit-input-placeholder {
    margin-top: 5px !important;
}

::-moz-placeholder {
    margin-top: 5px !important;
}

:-ms-input-placeholder {
    margin-top: 5px !important;
}

::-ms-input-placeholder {
    margin-top: 5px !important;
}

::placeholder {
    margin-top: 5px !important;
}

.input-group {
    border: 1px solid transparent;
    border-radius: 5px;
}

.custom-checkmark {
    position: absolute;
    top: 65%;
    left: 45%;
    -webkit-transform: translate(-55%, -48%) !important;
        -ms-transform: translate(-55%, -48%) !important;
            transform: translate(-55%, -48%) !important;
    font-weight: bold;
    background-size: cover;
    color: #fff;
    display: block;
    svg{
        height: 14px;
    }
}

#delete {font-size: 20px;}

li .completed:hover{ cursor: move; }

.smallFont { font-size: 14px; }
.hide-check{
    display: none;
}
.selected{ color: #4545f6;}
</style>
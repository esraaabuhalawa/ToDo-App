<template>
     <section class="container mt-5 ">
            <div class="row justify-content-center">
            <div class="col-10 col-md-8 col-lg-6 ">
            <header class="d-flex justify-content-between align-items-center mt-2 mb-2 mt-lg-5 mb-lg-4 my-md-2 pt-1">
                <h1 class="font-semibold align-self-stretch">ToDo</h1>
                <div class="align-self-stretch" id="switcher" @click="toggleClass()">
                    <span >
                        <img src="../assets/images/icon-moon.svg" v-show="switchClass"  class="w-100">

                        <img src="../assests/images/icon-sun.svg" v-show="!switchClass" class="w-100">
                    </span>
                    
                </div>
            </header>

            <!--Start O To Do List -->
            <section class="mb-3">
                <div class="input-group">
                    <div class="input-group-text">
                    <input class=" mt-0" type="radio" aria-label="Radio button for following text input" @click="addTodo()">
                    </div>
                    <input type="text" id="new" class="form-control" aria-label="Text input with radio button" placeholder="Create a new todo ..."  v-model="subject">
                </div>
            </section>
            <section>
                <ul class="list-group" v-cloak>
                    <li class="list-group-item" v-for="(todo ,index) in filteredTodos" :key="index" >
                        <div class="form-check ">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="todo.completed">
                            
                            <div class="form-check-label todo-content position-relative" for="flexCheckDefault"  :class="{completed:todo.completed}">
                               <p class="unbreakable me-4 editme"  contenteditable="true" @input="handleInput" @keydown.enter="endEdit()" @keyup="editTodo(todo)">
                                  {{todo.title}}
                               </p>
                               <!--<input type="text" v-model="editableContent"  v-show="edit" @dbclick="editTodo(todo)">-->

                               <svg @click="deleteTodo(todo)"  xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                                
                            </div>
                            
                        </div>
                    </li> 
                    <li class="list-group-item d-flex justify-content-between">
                        <div>
                            <span class="me-2">{{ todoNum }} items left</span>
                        </div>
                        <div>
                            <span @click="clearComplete">Clear Completed</span>
                        </div>
                    </li>
                </ul>

                <section class="mt-4">
                <li class="list-group-item text-center">
                        <span class="ms-2 " @click="visibilty='all'" :class="{selected:visibilty =='all'}">All</span>
                        <span class="ms-2" @click="visibilty='active'" :class="{selected:visibilty =='active'}">Active</span>
                        <span class="ms-2" @click="visibilty='completed'" :class="{selected:visibilty =='completed'}">Completed</span>
                </li>
                </section>
            </section>
        </div>
        </div>
        </section>
</template>
<script>
export default {
    data(){
        return {
            dark: true,
            todoText: '',
            subject:'',
            visibilty : 'all',
            editable:'',
            edit:false,
            
        todos : [
            {title:'todo1',completed:false},
            {title:'todo2',completed:true},
            {title:'todo3',completed:false}
        ],
        switchClass:'false',
        }
    },
    created(){
        this.todos = JSON.parse(localStorage.getItem(storage_key) || '[]')
    },
    methods: {
        addTodo(){
            if(this.subject != ''){
                this.todos.push({
                    title:this.subject,
                    completed:false,
                })
                localStorage.setItem(storage_key,JSON.stringify(this.todos));
            }   
        },
        deleteTodo(item){
            this.todos.splice(this.todos.indexOf(item),1)
            localStorage.setItem(storage_key,JSON.stringify(this.todos));
        },
        clearComplete(){
            this.todos = this.todos.filter((item) => {return item.completed === false});
        },
        toggleClass(){
            var element = document.body;
            element.dataset.bsTheme =
            element.dataset.bsTheme == "light" ? "dark" : "light";
            this.switchClass = !this.switchClass
        },
        handleInput(e){

           this.editable = e.target.innerText;
        },
        endEdit(){
            this.$el.querySelector('.editme').blur()
            
            console.log("title edit== " +todo.title);
           // localStorage.setItem(storage_key,JSON.stringify(this.todos));
         },
        editTodo(todo){
            todo.title = this.editable;
            localStorage.setItem(storage_key,JSON.stringify(this.todos));
        }
    },
    computed:{
        todoNum(){
            let leftItems = this.todos.filter((item) => {return item.completed === false});
            return leftItems.length
        },
        filteredTodos(){
            let filterTodos = [];
            if(this.visibilty == 'all'){
                filterTodos = this.todos
            }else if(this.visibilty == 'active'){
                filterTodos = this.todos.filter((item) => {return !item.completed})
            }else if(this.visibilty == 'completed'){
                filterTodos = this.todos.filter((item) => {return item.completed})
            }
            return filterTodos
        }
    },   
}
</script>
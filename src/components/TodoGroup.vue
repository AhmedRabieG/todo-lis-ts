<script setup lang="ts">
import { computed, ref } from 'vue';
import {Todo,TodoStatus } from '../types'
import Draggable from "vuedraggable";
import CreateTodo from './CreateTodo.vue';
import { useTodoStore } from "../store/todoStore";
import { Field, Form, ErrorMessage  } from 'vee-validate';
import * as yup from "yup";

const todoStore = useTodoStore();

const props = defineProps<Props>();

// Get todos by status
// const todoList = computed(() => todoStore.getTodosByStatus(props.status).value);
const schema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must be at least 5 characters")
    .max(20, "Title cannot exceed 50 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(5, "Description must be at least 10 characters")
    .max(50, "Description cannot exceed 50 characters"),
});

const todoList = todoStore.getTodosByStatus(props.status);

interface Props {
    status: TodoStatus;
}

const groupLabel = {
  [TodoStatus.Pending]: "Todo",
  [TodoStatus.InProgress]: "In Progress",
  [TodoStatus.Done]: "Done",
};

const onDraggableChange = (payload: any) => {
  // console.log(payload);
  if (payload?.added?.element?.status) {
    todoStore.updateTodo(payload?.added?.element, props.status);
  }
};

// Handle draggable change
// const onDraggableChange = (payload: any) => {
//   if (payload?.added?.element) {
//     const updatedTodo = {
//       ...payload.added.element,
//       status: props.status,
//     };
//     todoStore.updateTodo(updatedTodo);
//   }
// };

console.log("todoList", todoList)

const editingTodo = ref<Todo | null>(null);
const updatedTitle = ref("");
const updatedDescription = ref("");

const editTodoItem = (todo: Todo) => {
  editingTodo.value = { ...todo };
  updatedTitle.value = todo.title;
  updatedDescription.value = todo.description;
};

const saveEdit = () => {
  if (editingTodo.value) {
    todoStore.updateTodoItem({
      ...editingTodo.value,
      title: updatedTitle.value,
      description: updatedDescription.value,
    });
    editingTodo.value = null; 
  }
};

const cancelEdit = () => {
  editingTodo.value = null; 
};

</script>

<template>
    <section class="todo-wrapper">
      <h3 class="">{{ groupLabel[props.status] }}</h3>
  
      <Draggable
        class="draggable"
        :list="todoList"
        group="todos"
        itemKey="id"
        @change="onDraggableChange"
      >
        <template #item="{ element: todo }">
          <div class="draggable-item">
            <!-- Vee Validate Form for Updating -->
            <template v-if="editingTodo?.id === todo.id">
              <Form class=""
                    @submit="saveEdit" 
                    :validation-schema="schema">
                <div class="input-group">
                  <label for="title">Title:</label>
                  <Field
                    id="title"
                    name="title"
                    v-model="updatedTitle"
                    placeholder="Edit title"
                  />
                  <ErrorMessage name="title" />
                </div>
  
                <div class="input-group">
                  <label for="description">Description:</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    v-model="updatedDescription"
                    placeholder="Edit description"
                  />
                  <ErrorMessage name="description" />
                </div>
                <div class="btn-group">
                    <button type="submit">Update</button>
                    <button type="button" @click="cancelEdit">Cancel</button>
                </div>
                
              </Form>
            </template>
  
            <template v-else>
              <div>
                <strong>Title:</strong> {{ todo.title }}
              </div>
              <div>
                <strong>Description:</strong> {{ todo.description }}
              </div>
              <div>
                <strong>Status:</strong> {{ todo.status }}
              </div>
              <div class="btn-group">
                <button @click="editTodoItem(todo)">Edit</button>
                <button class="delete-icon" @click="todoStore.deleteTodo(todo)">Delete</button>
              </div>
              
            </template>
          </div>
        </template>
      </Draggable>
  
      <CreateTodo v-if="groupLabel[props.status] ==='Todo'" :status="props.status" />
    </section>
  </template>

<style lang="scss">
.todo-wrapper {
    padding: 10px;
    background-color: #e7e7e7;
    min-height: 500px;
    border-radius: 4px;
    h3 {
        margin-bottom: 10px;
        text-align: center;
    }
    .draggable {
        width: 100%;
        min-height: 500px;
        .draggable-item {
            margin-bottom: 1rem;
            background-color:#209158;
            padding: 5px;
            border-radius: 4px;
            font-size: 15px;
            color: rgb(255, 245, 245);

            div {
              margin-bottom: 5px;
            }
            strong {
                color: rgb(250, 219, 219);
            }
        }
    }
    
}
.btn-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;
}
</style>
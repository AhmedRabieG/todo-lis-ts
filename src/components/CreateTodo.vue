<script setup lang="ts">
import { reactive, ref } from "vue";
import { Field, Form, ErrorMessage  } from 'vee-validate';
import type { Todo, TodoStatus } from "../types";
import useTodos from "../compasable/useTodos";
import { useTodoStore } from "../store/todoStore";
import * as yup from "yup";

const todoStore = useTodoStore();

const initialValues = reactive({
  title: "",
  description: "",
});

interface Props {
  status: TodoStatus;
}
const props = defineProps<Props>(
  
);
const shouldDisplayForm = ref(false);
const showButton = ref(true);

// const { addNewTodo } = useTodos();

const newTodo = reactive<Omit<Todo, "id">>({
  title: "",
  description: "",
  status: props.status,
});

const resetForm = () => {
  shouldDisplayForm.value = false;
  newTodo.title = "";
  newTodo.description = "";
};

const onSubmit = (values: { title: string; description: string }) => {
  todoStore.addNewTodo({
    id: Math.random() * 10000000000000000, // generate  random id
    title: values.title,
    description: values.description,
    status: props.status,
  });

  initialValues.title = "";
  initialValues.description = "";
  
  resetForm();
};

const schema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(20, "Title cannot exceed 20 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(5, "Description must be at least 5 characters")
    .max(50, "Description cannot exceed 50 characters"),
});

</script>

<template>
  <div class="form-wapper">
    <button class="add-todo-btn"
      v-if="!shouldDisplayForm"
      @click="shouldDisplayForm = !shouldDisplayForm"
    >
      Add New Todo
    </button>
    <template v-else>
      <Form class="create-form"
        v-slot="{ errors, values }"
        :initial-values="initialValues"
        :validation-schema="schema"
        @submit="onSubmit"
      >
      <!-- {{ errors }} {{ values }} -->
       <div class="input-group">
          <label class="label" for="title">Title</label>
          <Field class="input-text" name="title" id="title"         placeholder="Enter title" />
          <ErrorMessage name="title" class="error" />
       </div>
       <div class="input-group">
        <label for="description">Description</label>
        <Field
          name="description"
          id="description"
          as="textarea"
          placeholder="Enter description"
        />
        <ErrorMessage name="description" class="error" />
       </div>
       <div class="btn-group">
        <button type="submit">Save</button>
        <button type="button" @click="resetForm">Cancel</button>
       </div>
        
       </form>

    </template>
  </div>
</template>

<style lang="scss">
.add-todo-btn {
  font-size: 16px;
  font-weight: 600;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}
.form-wapper {
  display: flex;
  align-items: center;
  justify-content: center;
  }
.create-form {
    width: 100%;
    padding: 1rem;
    border-radius: 4px;
    background-color: #b3b3b3;
  }
.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;

  label {

  }
  input, textarea {
    padding: 10px;
    outline: none;
    border: none;
    border-radius: 4px;
    margin-bottom: 5px;
  }
}
.error {
  color: rgb(126, 16, 16);
  font-size: 13px;
}
</style>
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { TodoStatus, type Todo } from "../types";

interface TodoStore {
  [TodoStatus.Pending]: Todo[];
  [TodoStatus.InProgress]: Todo[];
  [TodoStatus.Done]: Todo[];
}

const defaultVal: TodoStore = {
  [TodoStatus.Pending]: [
    {
      id: 1,
      title: "test Todo item",
      description: "test Todo item test Todo item test Todo item test Todo item",
      status: TodoStatus.Pending,
    },
  ],
  [TodoStatus.InProgress]: [],
  [TodoStatus.Done]: [],
};

export const useTodoStore = defineStore("todoStore", () => {
  // State
  const todos = ref<TodoStore>(defaultVal);

  // Getters
  const getTodosByStatus = (status: TodoStatus) =>
    computed(() => todos.value[status]);

  // Actions
  
  const updateTodo = (todo: Todo, newStatus: TodoStatus) => {
    todo.status = newStatus;
  };

  // const updateTodo = (todo: Todo, newStatus: TodoStatus) => {
  //   // Remove from the current status array
  //   todos.value[todo.status] = todos.value[todo.status].filter(
  //     (t) => t.id !== todo.id
  //   );
  //   // Update the status of the todo
  //   todo.status = newStatus;
  //   // Add to the new status array
  //   todos.value[newStatus].push(todo);
  // };

  const updateTodoItem = (updatedTodo: Todo) => {
    // Remove from the old status
    todos.value[updatedTodo.status] = todos.value[updatedTodo.status].map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
  };

  const addNewTodo = (todo: Todo) => {
    todos.value[todo.status].push(todo);
  };

  const deleteTodo = (todoToDelete: Todo) => {
    todos.value[todoToDelete.status] = todos.value[todoToDelete.status].filter(
      (todo) => todo.id !== todoToDelete.id
    );
  };

  return {
    todos,
    getTodosByStatus,
    addNewTodo,
    deleteTodo,
    updateTodo,
    updateTodoItem
  };
});

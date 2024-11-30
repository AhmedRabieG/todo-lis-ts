<script setup lang="ts">
import TodoGroup from './TodoGroup.vue';
import { TodoStatus } from "../types";

</script>

<template>

    <section>
        <div class="container">
            <h1>Todo List</h1>
            <h3>You can drag and drop every card you created !</h3>
            <div class="group-wrapper">
                <TodoGroup :status="TodoStatus.Pending" />
                <TodoGroup :status="TodoStatus.InProgress"/>
                <TodoGroup :status="TodoStatus.Done"/>
            </div>
        </div>
    </section>

</template>

<style lang="scss" scoped>
h3, h1 {
    font-family: Inter;
    text-align: center;
}
h1 {
    font-size: 30px;
}
h3 {
    font-size: 20px;
    margin-bottom: 1rem;
}
.group-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    padding-bottom: 150px;
}
</style>
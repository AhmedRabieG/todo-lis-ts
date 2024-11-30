<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Home from './views/Home.vue'
import about from './views/about.vue'

</script>

<template>
  <section>
    <nav>
        <router-link to="/" >Home</router-link>
        <router-link to="/about" >About</router-link>
    </nav>
  </section>
  <RouterView />
</template>

<style lang="scss" scoped>
section {
  margin-bottom: 1rem;
}
nav {
  display: flex;
  justify-content:center;
  align-items: center;
  padding: 1rem;
  gap: .5rem;
  background-color: #e7e7e7;
  
  a {
    font-weight: 600;
  }
}
</style>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useCounterStore } from './stores/counter'
import LoginForm from '@/components/LoginForm.vue'



const varA = "Hello"
const varB = "World"
const obj1 ={"name":"John", "age":30, "city":"New York"}
const html1 = "<h1>hello</h1>"

const style01 ={
  class:"text-3xl",  id:"123" ,style:"background-color: red; cursor:pointer;"
}

const a = ref(0);
const a2= 0;
const a3 = ref({k1:1, k2: {k21:2, k22:3}});

function increment(){
  a.value++;
}
function increment2(){
  a3.value.k2.k21++;
}
</script>

<template>
  <header>
    <LoginForm />
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

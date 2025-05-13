<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useCounterStore } from './stores/counter'
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
    <h1 >{{varA}} {{ varB }}</h1>
    <h3>{{ varA + ' ' + varB + "number2" }}</h3>
    <h1>{{ obj1 }}</h1>
    {{ html1 }}
    <HelloWorld msg="Default message"></HelloWorld>
    
    
    <h1 v-html="html1"></h1>
    <button type="button" :disabled="Boolean(0)" v-bind="style01" >This is a button</button>

    <button @click="a++" style="background-color: aqua;">{{ a }}</button>
    <button @click="a2++" style="background-color: burlywood;">{{ a2 }}</button>
    <button @click="increment()" style="background-color: aqua;">{{ a }}</button>
    <button @click="increment2()" style="background-color: aqua;">{{ a3 }}</button>

    <!-- <button @click="counterStore.increment()">{{counterStore.count}}</button> -->
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
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

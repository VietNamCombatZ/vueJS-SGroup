<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LoginForm from './components/LoginForm.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import DefaultLayout from './layouts/default.vue'
import AuthLayout from './layouts/auth.vue'

const route = useRoute();
console.log(route);


const layout = computed(() => {
    return route.meta.isAuthLayout  ? AuthLayout : DefaultLayout
})

</script>

<template>
    <component :is="layout">
        <!-- <button>test</button> -->

        <RouterView />
    </component>



</template>

<style scoped>

</style>

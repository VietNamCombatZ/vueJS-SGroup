<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <Card class="mx-auto max-w-sm width-full">
    <CardHeader>
      <CardTitle class="text-2xl">
        Register
      </CardTitle>
      <CardDescription>
        Enter your information to register
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <a href="#" class="ml-auto inline-block text-sm underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" class="w-full">
          Login
        </Button>
        <Button variant="outline" class="w-full">
          Login with Google
        </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <a href="#" class="underline">
          Sign up
        </a>
      </div>
    </CardContent>
  </Card>
</template>







<!-- <script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import router from '@/router'
import { $post } from '@/apis'

const email = ref('')
const password = ref('')

function handleSubmit(event: Event) {
  event.preventDefault()
  login()
}

async function login() {
  try{
  // validate email and password
  if (!isEmailValid.value) {
    alert('Invalid email format')
    return
  }
  if (!isPasswordValid.value) {
    alert('Password must be at least 8 characters long and contain at least one letter and one number')
    return
  }
  // make API call to login
  const response = await $post('auth/login', {
    email: email.value,
    password: password.value
  })

  alert('Login successful!')
  alert(`accessToken: ${response.data?.data.accessToken}`)


  localStorage.setItem('token', response.data?.token)

  router.push('/home')
}
  catch (error) {
    console.error('Login failed:', error)
    alert('Login failed. Please try again.')
  }
}



const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const isEmailValid = computed(() => emailRegex.test(email.value))
const isPasswordValid = computed(() => passwordRegex.test(password.value))

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card class="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription> Enter your email below to login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div class="flex flex-col gap-6">
            <div class="grid gap-3">
              <Label for="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com"
              @input="email = $event.target.value"
              required />
            </div>
            <div class="grid gap-3">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <a href="#" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password"
              @input="password = $event.target.value"
              required />
            </div>
            <div class="flex flex-col gap-3">
              <Button type="submit" class="w-full" @click = "handleSubmit"> Login </Button>
              <Button variant="outline" class="w-full"> Login with Google </Button>
            </div>
          </div>
          <div class="mt-4 text-center text-sm">
            Don't have an account?
            <a href="#" class="underline underline-offset-4"> Sign up </a>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template> -->








<!-- <script lang="ts">
export const description
  = 'A simple login form with email and password. The submit button says \'Sign in\'.'
export const iframeHeight = '870px'
export const containerClass = 'w-full h-full'
</script>
<script setup lang="ts">
import LoginForm from '@/registry/default/blocks/Login01/components/LoginForm.vue'
</script>
<template>
  <div class="flex h-screen w-full items-center justify-center px-4">
    <LoginForm />
  </div>
</template> -->

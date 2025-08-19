<!-- <script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { $post } from '@/apis'
import router from '@/router'

const email = ref('')
const password = ref('')

async function login() {

  // Khai báo biến reactive cho input

  try {
    console.log('email:', email.value);
    console.log('password:', password.value);
    const response = await $post('auth/login', {
      // email:'nguyenduchuyhnh54@gmail.com',
      // // email: 'test01',
      // password: 'testpass04'


      email: email.value,
      password: password.value
    })
    localStorage.clear();
    localStorage.setItem('token', '123456');
    // localStorage.setItem('token', response.data?.data.accessToken)

    console.log('Login successful:', response.data)
    router.push({ name: 'Home' })
  } catch (error) {
    console.error('Login failed:', error)
    alert('Login failed. Please try again.')

  }

}


</script>









<template>
  <Card class="mx-auto max-w-sm w-full">
    <CardHeader>
      <CardTitle class="text-2xl">
        Login
      </CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example01.com"
            v-model="email"
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
          <Input id="password" type="password" v-model="password" required />
        </div>
        <Button type="submit" class="w-full" @click="login">
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

`<script setup lang="ts">
import { useForm } from 'vee-validate'
import axios from 'axios'
import { toTypedSchema } from '@vee-validate/zod'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AxiosError } from 'axios'
import type { ApiResponse } from '@/apis/apiResponse'
import { useUserStore } from '@/stores/user'

const errorMessage = ref('')
const router = useRouter()

const formSchema = toTypedSchema(z.object({
  email: z.string().min(2).max(50).email(),
  password: z.string().min(6).max(100).refine((val) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(val) || 'Password must contain at least one letter and one number'
  }),
}))

const form = useForm({
  validationSchema: formSchema,
})

// const onSubmit = form.handleSubmit((values) => {
//   console.log('Form submitted!', values)
// })
const onSubmit = form.handleSubmit(async (values) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      email: values.email,
      password: values.password,
    })

    const tokenData = response.data.data // vì bạn đang trả qua ServiceResponse
    localStorage.setItem('accessToken', tokenData.accessToken)

    const userStore = useUserStore()
await userStore.fetchUser()
router.push({ name: 'Home' })


    // router.push('/dashboard')
    router.push({ name: 'Home' })
  } catch (error: unknown) {
    // console.error('Login failed:', error)
    // errorMessage.value = error.response?.data?.message || 'Login failed'
    const axiosError = error as AxiosError<ApiResponse<null>>

    if (axiosError.response?.data) {
      errorMessage.value = axiosError.response.data.message
    } else {
      errorMessage.value = 'Unexpected error. Please try again later.'
    }
  }
})
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center px-4">
    <div class="w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6">Login</h1>
      <p class="mb-4">Enter your email and password to login.</p>
      <FormField v-slot="{ field }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="text" placeholder="shadcn" v-bind="field" />
          </FormControl>
          <!-- <FormDescription>
            This is your public display name.
          </FormDescription> -->
          <FormMessage />
        </FormItem>
      </FormField>


      <FormField v-slot="{ field }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="text" placeholder="shadcn" v-bind="field" />
          </FormControl>
          <!-- <FormDescription>
            This is your public display name.
          </FormDescription> -->
          <FormMessage />
        </FormItem>
      </FormField>


      <Button type="submit" @click="onSubmit">Submit</Button>
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <RouterLink to="/register" class="underline">Sign up</RouterLink>

      </div>
      </div>

    </div>
</template>
`

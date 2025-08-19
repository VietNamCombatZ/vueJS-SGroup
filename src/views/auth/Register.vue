<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'
import axios from 'axios'
import {useRouter} from 'vue-router'

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
import { toast } from 'vue-sonner'
import { Eye, EyeOff } from 'lucide-vue-next' // 👁️ biểu tượng từ lucide-vue-next

//Trong FE nên làm regex phân cấp, kiểm từng mục một

// Regex password yêu cầu: ít nhất 1 chữ thường, 1 chữ hoa, 1 số, 1 ký tự đặc biệt, dài 8-20 ký tự
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/
// const passwordRegex = /^[A-Za-z0-9]{6,20}$/;

const router = useRouter()

const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(20, 'Password must be at most 20 characters')
  .refine((val) => /[a-zA-Z]/.test(val), { message: 'Must contain a letter' })
  // .refine((val) => /[A-Z]/.test(val), { message: 'Must contain an uppercase letter' })
  .refine((val) => /\d/.test(val),    { message: 'Must contain a number' })


const showPassword = ref(false)
const showConfirmPassword = ref(false)

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email'),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Please select your gender' }),
  }),
  birthDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val)),
  password: passwordSchema,
  confirmPassword: z.string(),
  bio: z.string().max(255).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
}))





const { handleSubmit } = useForm({ //hàm của vee-validate, được dùng để thiết lập form, gắn schema kiểm tra và lấy các hàm xử lý (như handleSubmit).
  validationSchema: formSchema, //liên kết formSchema (zod) với form để kiểm tra giá trị người dùng nhập vào
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await axios.post('http://localhost:3000/auth/register', {
      name: values.name,
      email: values.email,
      password: values.password,
      gender: values.gender,
      birthDate: values.birthDate,
      bio: values.bio || null, // nếu không có thì null
    })

    toast.success('Register successful! Redirecting to login...')

    setTimeout(() => {
      router.push('/login')
    }, 1500)

  } catch (error) {
    toast.error('Register failed! Please try again.')
    console.error(error)
  }
})

</script>



<template>
  <form class="w-2/3 space-y-6" @submit="onSubmit">
    <!-- name -->
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="John Doe" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          This is your public display name.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- email -->
     <FormField v-slot="{ componentField }" name="email">
  <FormItem>
    <FormLabel>Email</FormLabel>
    <FormControl>
      <Input type="email" placeholder="you@example.com" v-bind="componentField" />
    </FormControl>
    <FormMessage />
  </FormItem>
</FormField>


    <!-- password -->
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <div class="relative">
            <Input
              :type="showPassword ? 'text' : 'password'"
              placeholder="********"
              v-bind="componentField"
              class="pr-10"
            />
            <button
              type="button"
              class="absolute right-2 top-2.5 text-gray-500 hover:text-black"
              @click="showPassword = !showPassword"
            >
              <component :is="showPassword ? EyeOff : Eye" class="w-5 h-5" />
            </button>
          </div>
        </FormControl>
        <FormDescription>
          Your password must be 6-20 characters long, with letters, numbers and special characters.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Confirm password -->
    <FormField v-slot="{ componentField }" name="confirmPassword">
      <FormItem>
        <FormLabel>Confirm Password</FormLabel>
        <FormControl>
          <div class="relative">
            <Input
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="********"
              v-bind="componentField"
              class="pr-10"
            />
            <button
              type="button"
              class="absolute right-2 top-2.5 text-gray-500 hover:text-black"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <component :is="showConfirmPassword ? EyeOff : Eye" class="w-5 h-5" />
            </button>
          </div>
        </FormControl>
        <FormDescription>
          Repeat your password.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Bio -->
     <FormField v-slot="{ componentField }" name="bio">
  <FormItem>
    <FormLabel>Bio</FormLabel>
    <FormControl>
      <Input type="text" placeholder="Tell us about yourself" v-bind="componentField" />
    </FormControl>
    <FormMessage />
  </FormItem>
</FormField>


    <!-- Gender -->
<FormField v-slot="{ componentField }" name="gender">
  <FormItem>
    <FormLabel>Gender</FormLabel>
    <FormControl>
      <div class="flex gap-4">
        <label class="flex items-center gap-1">
          <input type="radio" value="male" v-bind="componentField" /> Male
        </label>
        <label class="flex items-center gap-1">
          <input type="radio" value="female" v-bind="componentField" /> Female
        </label>
        <label class="flex items-center gap-1">
          <input type="radio" value="other" v-bind="componentField" /> Other
        </label>
      </div>
    </FormControl>
    <FormDescription>Select your gender.</FormDescription>
    <FormMessage />
  </FormItem>
</FormField>

<!-- Birth Date -->
<FormField v-slot="{ componentField }" name="birthDate">
  <FormItem>
    <FormLabel>Birth Date</FormLabel>
    <FormControl>
      <Input type="date" v-bind="componentField" />
    </FormControl>
    <FormDescription>Choose your date of birth.</FormDescription>
    <FormMessage />
  </FormItem>
</FormField>



  <Button type="submit" @click="onSubmit">Submit</Button>
  </form>
</template>

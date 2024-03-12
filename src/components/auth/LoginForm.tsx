'use client'

import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition, useState } from 'react'

import { LogIn } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CardWrapper } from '@/components/auth/CardWrapper'
import { FormError } from '@/components/common/FormError'

import { login } from '@/actions/login'

import { LoginSchema } from '@/shcemas/auth'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const LoginForm = () => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loading = isPending || form.formState.isSubmitting
  const isDirty = form.formState.isDirty

  const handleSubmitLogin = (values: z.infer<typeof LoginSchema>) => {
    setError('')

    startTransition(() => {
      login(values)
        .then((res) => {
          if (res.error) {
            setError(res.error)
            return
          }

          router.push(DEFAULT_LOGIN_REDIRECT)
        })
        .catch(() => {
          setError('Something went wrong')
        })
    })
  }

  return (
    <CardWrapper title='Sign in' description='Please sing in'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitLogin)}
          className='space-y-4'
        >
          <div className='space-y-4'>
            <FormField
              name='email'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor='email'
                    className='uppercase text-sm font-bold dark:text-zinc-200'
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      id='email'
                      type='email'
                      placeholder='example@mail.com'
                      className='border-none dark:bg-neutral-900/50'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />

            <FormField
              name='password'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor='password'
                    className='uppercase text-sm font-bold dark:text-zinc-200'
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      id='password'
                      type='password'
                      placeholder='***'
                      className='border-none dark:bg-neutral-900/50'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />
          </div>

          {error && <FormError message={error} />}

          <div>
            <Button
              variant='primary'
              size='lg'
              disabled={loading || !isDirty}
              className='w-full font-bold uppercase'
            >
              <LogIn className='h-5 w-5 mr-3' />
              Sign In
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}

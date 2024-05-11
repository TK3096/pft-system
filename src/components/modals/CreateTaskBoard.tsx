'use client'

import React, { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { CreateTaskBoardSchema } from '@/schemas/tasks-management'

import { useModal } from '@/hooks/useModal'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
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
import { Textarea } from '@/components/ui/textarea'
import { FormError } from '@/components/common/FormError'

export const CreateTaskBoard = () => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string>('')

  const { open, type, onClose } = useModal()

  const form = useForm({
    resolver: zodResolver(CreateTaskBoardSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const isOpen = open && type === 'create-task-board'
  const loading = isPending || form.formState.isSubmitting
  const isDirty = form.formState.isDirty

  const handleSubmitForm = (values: z.infer<typeof CreateTaskBoardSchema>) => {}

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='p-0 overflow-hidden w-3/5'>
        <DialogHeader className='pt-8 pb-13 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Create a New Board
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            This will create a new board for you to manage your tasks.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitForm)}
            className='space-y-8'
          >
            <div className='space-y-2 px-6'>
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor='name'
                      className='uppercase text-sm font-bold dark:text-zinc-200'
                    >
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id='name'
                        type='text'
                        placeholder='Board name'
                        className='boarder-none dark:bg-stone-900/50'
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='description'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor='description'
                      className='uppercase text-sm font-bold dark:text-zinc-200'
                    >
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id='description'
                        rows={3}
                        placeholder='Board description'
                        className='boarder-none dark:bg-stone-900/50'
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <FormError message={error} />}
            </div>

            <DialogFooter className='dark:bg-stone-900 px-6 py-4'>
              <Button
                type='button'
                variant='secondary'
                disabled={loading}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='primary'
                disabled={loading || !isDirty}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

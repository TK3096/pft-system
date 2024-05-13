'use client'

import React, { useEffect, useState, useTransition } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import qs from 'query-string'

import { createTaskGroup } from '@/actions/tasks-management'

import { CreateTaskGroupSchema } from '@/schemas/tasks-management'

import { useModal } from '@/hooks/useModal'
import { useTasksManagement } from '@/hooks/useTasksManagement'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
  FormLabel,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { FormError } from '@/components/common/FormError'

export const CreateTaskGroupModal: React.FC = () => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const [error, setError] = useState<string>('')

  const { open, type, data, onClose } = useModal()

  const form = useForm({
    resolver: zodResolver(CreateTaskGroupSchema),
    defaultValues: {
      name: '',
      description: '',
      boardId: '',
    },
  })

  const boardId = data?.taskBoard.id
  const isOpen = type === 'create-task-group' && open
  const loading = form.formState.isSubmitting || isPending
  const isDirty = form.formState.isDirty

  const handleSubmitForm = (values: z.infer<typeof CreateTaskGroupSchema>) => {
    setError('')

    try {
      startTransition(async () => {
        const res = await createTaskGroup(values)

        if (res?.error) {
          setError(res.error)
          return
        }

        if (res?.success) {
          const url = qs.stringifyUrl({
            url: '/tasks-management',
            query: { b: boardId, g: res.success.id },
          })

          router.replace(url)
          handleClose()
        }
      })
    } catch {
      setError('Something went wrong')
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  useEffect(() => {
    if (boardId) {
      form.setValue('boardId', boardId)
    }
  }, [boardId, form])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='p-0 overflow-hidden w-3/5'>
        <DialogHeader className='pt-8 pb-13 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Create Task Group
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Create a new task group to organize your tasks
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitForm)}
            className='space-y-8'
          >
            <div className='space-y-2 px-6'>
              <div className='space-y-2'>
                <FormLabel className='uppercase text-sm font-bold dark:text-zinc-200'>
                  Board
                </FormLabel>
                <Input
                  type='text'
                  className='boarder-none dark:bg-stone-900/50'
                  defaultValue={data?.taskBoard.name || ''}
                  disabled
                />
              </div>

              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor='name'
                      className='uppercase text-sm font-bold dark:text-zinc-200'
                    >
                      name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id='name'
                        type='text'
                        placeholder='Group name'
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
                        placeholder='Group description'
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
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='primary'
                disabled={!isDirty || loading}
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

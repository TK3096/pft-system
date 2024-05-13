'use client'

import React, { useEffect, useState, useTransition } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { updateTaskGroup } from '@/actions/tasks-management'

import { UpdateTaskGroupSchema } from '@/schemas/tasks-management'

import { useModal } from '@/hooks/useModal'

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
import { Checkbox } from '@/components/ui/checkbox'

export const UpdateTaskGroupModal: React.FC = () => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const [error, setError] = useState<string>('')

  const { open, type, data, onClose } = useModal()

  const form = useForm({
    resolver: zodResolver(UpdateTaskGroupSchema),
    defaultValues: {
      name: '',
      description: '',
      boardId: '',
      isDeleted: false,
    },
  })

  const groupId = data?.taskGroup?.id!
  const isOpen = type === 'update-task-group' && open
  const loading = form.formState.isSubmitting || isPending
  const isDirty = form.formState.isDirty

  const handleSubmitForm = (values: z.infer<typeof UpdateTaskGroupSchema>) => {
    setError('')

    try {
      startTransition(async () => {
        const res = await updateTaskGroup(groupId, values)

        if (res?.error) {
          setError(res.error)
          return
        }

        if (res?.success) {
          router.refresh()
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
    if (data?.taskGroup) {
      form.setValue('boardId', data.taskGroup.boardId)
      form.setValue('name', data.taskGroup.name)
      form.setValue('description', data.taskGroup.description)
      form.setValue('isDeleted', data.taskGroup.isDeleted)
    }
  }, [data?.taskGroup, form])

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
                  defaultValue={data?.taskBoard?.name || ''}
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

              <FormField
                name='isDeleted'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='flex items-end gap-2'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className='text-zinc-400'>
                      <span>Delete this task group</span>
                    </FormLabel>
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
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

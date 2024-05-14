'use client'

import React, { useTransition, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { UpdateTaskBoardSchema } from '@/schemas/tasks-management'

import { updateTaskBoard } from '@/actions/tasks-management'

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
import { Checkbox } from '@/components/ui/checkbox'

export const UpdateTaskBoardModal = () => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string>('')

  const { open, type, onClose, data } = useModal()

  const form = useForm({
    resolver: zodResolver(UpdateTaskBoardSchema),
    defaultValues: {
      name: '',
      description: '',
      isDeleted: false,
    },
  })

  const id = data?.taskBoard?.id!
  const isOpen = open && type === 'update-task-board'
  const loading = isPending || form.formState.isSubmitting
  const isDirty = form.formState.isDirty

  const handleSubmitForm = (values: z.infer<typeof UpdateTaskBoardSchema>) => {
    setError('')

    try {
      startTransition(async () => {
        const res = await updateTaskBoard(id, values)

        if (res?.error) {
          setError(res.error)
          return
        }

        if (res?.success) {
          handleClose()
          router.refresh()
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
    if (data?.taskBoard) {
      form.setValue('name', data.taskBoard.name)
      form.setValue('description', data.taskBoard.description)
      form.setValue('isDeleted', data.taskBoard.isDeleted)
    }
  }, [data?.taskBoard, form])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='p-0 overflow-hidden w-3/5'>
        <DialogHeader className='pt-8 pb-13 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Update Board
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Update board details
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
                        className='border-none dark:bg-stone-900/50'
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
                        rows={5}
                        placeholder='Board description'
                        className='border-none dark:bg-stone-900/50'
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
                      <span>Delete this task board</span>
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
                disabled={loading || !isDirty}
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

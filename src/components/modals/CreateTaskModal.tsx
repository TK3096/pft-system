'use client'

import { TaskStatus } from '@/types'

import React, { useState, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import qs from 'query-string'

import { X } from 'lucide-react'

import { useModal } from '@/hooks/useModal'

import { createTask } from '@/actions/tasks-management'

import { CreateTaskSchema } from '@/schemas/tasks-management'

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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select'
import { ActionTooltip } from '@/components/common/ActionTooltip'

import { TASK_STATUS } from '@/lib/constant'

export const CreateTaskModal: React.FC = () => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const [error, setError] = useState<string>('')
  const [remarkFields, setRemarkFields] = useState<string[]>([''])

  const { type, open, data, onClose } = useModal()

  const form = useForm({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      tag: '',
      name: '',
      description: '',
      groupId: '',
      status: TaskStatus.TODO,
      remarks: [] as string[],
    },
  })

  const isOpen = type === 'create-task' && open
  const loading = isPending || form.formState.isSubmitting
  const isDirty = form.formState.isDirty
  const boardId = data?.taskGroup?.boardId

  const handleRemarkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newRemarkFields = [...remarkFields]
    newRemarkFields[index] = e.target.value

    if (index === newRemarkFields.length - 1) {
      newRemarkFields.push('')
    }

    setRemarkFields(newRemarkFields)
    form.setValue('remarks', newRemarkFields)
  }

  const handleRemarkRemove = (index: number) => {
    const newRemarkFields = [...remarkFields]
    const filter = newRemarkFields.filter((_, i) => i !== index)

    setRemarkFields(filter)
    form.setValue('remarks', filter)
  }

  const handleSubmitForm = (values: z.infer<typeof CreateTaskSchema>) => {
    setError('')

    try {
      startTransition(async () => {
        const res = await createTask(values)

        if (res?.error) {
          setError(res.error)
        }

        if (res?.success) {
          const url = qs.stringifyUrl({
            url: '/tasks-management',
            query: { b: boardId, g: values.groupId, t: res.success.id },
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
    if (data?.taskGroup) {
      form.setValue('groupId', data.taskGroup.id)
    }
  }, [form, data?.taskGroup])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='p-0 overflow-hidden w-3/5'>
        <DialogHeader className='pt-8 pb-13 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Create Task
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Fill in the details below to create a new task.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className='space-y-8'
            onSubmit={form.handleSubmit(handleSubmitForm)}
          >
            <div className='space-y-2 px-6'>
              <div className='space-y-2'>
                <FormLabel className='uppercase text-sm font-bold dark:text-zinc-200'>
                  Group
                </FormLabel>
                <Input
                  type='text'
                  className='border-none dark:bg-stone-900/50'
                  defaultValue={data?.taskGroup?.name || ''}
                  disabled
                />
              </div>

              <div className='grid grid-cols-[1fr_20%] gap-3'>
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
                          placeholder='Task name'
                          className='border-none dark:bg-stone-900/50'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name='tag'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor='tag'
                        className='uppercase text-sm font-bold dark:text-zinc-200'
                      >
                        Tag
                      </FormLabel>
                      <FormControl>
                        <Input
                          id='tag'
                          type='text'
                          placeholder='Task tag'
                          className='border-none dark:bg-stone-900/50'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                        placeholder='Task description'
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
                name='status'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor='status'
                      className='uppercase text-sm font-bold dark:text-zinc-200'
                    >
                      Status
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className='border-none dark:bg-stone-900/50'>
                          <SelectValue placeholder='Select status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TASK_STATUS.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.replace('_', ' ').toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className='uppercase text-sm font-bold dark:text-zinc-200'>
                  Remarks
                </FormLabel>
                <div className='w-full space-y-2 max-h-[250px] overflow-y-scroll no-scrollbar'>
                  {remarkFields.map((remark, index) => (
                    <div
                      key={`remark-${index}`}
                      className='py-1 grid grid-cols-[1fr_8%] gap-1'
                    >
                      <Input
                        disabled={loading}
                        value={remark}
                        placeholder='Task remark'
                        onChange={(e) => handleRemarkChange(e, index)}
                        className='border-none dark:bg-stone-900/50'
                      />
                      {remarkFields.length > 1 &&
                        index !== remarkFields.length - 1 && (
                          <ActionTooltip
                            label='delete'
                            side='left'
                            align='center'
                          >
                            <Button
                              type='button'
                              size='icon'
                              variant='outline'
                              className='border-none'
                              disabled={loading}
                              onClick={() => handleRemarkRemove(index)}
                            >
                              <X className='w-4 h-4' />
                            </Button>
                          </ActionTooltip>
                        )}
                    </div>
                  ))}
                </div>
              </FormItem>

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

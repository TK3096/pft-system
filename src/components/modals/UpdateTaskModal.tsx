'use client'

import { TaskGroup, TaskStatus } from '@/types'

import React, { useState, useEffect, useTransition, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { X } from 'lucide-react'

import { useModal } from '@/hooks/useModal'

import { updateTask } from '@/actions/tasks-management'

import { UpdateTaskSchema } from '@/schemas/tasks-management'

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
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'
import { ActionTooltip } from '@/components/common/ActionTooltip'
import { Checkbox } from '@/components/ui/checkbox'

import { TASK_STATUS } from '@/lib/constant'

export const UpdateTaskModal: React.FC = () => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const [error, setError] = useState<string>('')
  const [remarkFields, setRemarkFields] = useState<string[]>([''])

  const { type, open, data, onClose } = useModal()

  const form = useForm({
    resolver: zodResolver(UpdateTaskSchema),
    defaultValues: {
      tag: '',
      name: '',
      description: '',
      groupId: '',
      status: TaskStatus.TODO,
      remarks: [] as string[],
      isDeleted: false,
    },
  })

  const isOpen = type === 'update-task' && open
  const loading = isPending || form.formState.isSubmitting
  const isDirty = form.formState.isDirty
  const taskId = data?.task?.id
  const tasksBoards = data?.taskBoards || []

  const groupOptions = useMemo(() => {
    if (!data?.taskGroups) {
      return null
    }

    return data.taskGroups.reduce(
      (acc: { [key: string]: TaskGroup[] }, cur: TaskGroup) => {
        if (acc[cur.boardId]) {
          acc[cur.boardId].push(cur)
        } else {
          acc[cur.boardId] = [cur]
        }

        return acc
      },
      {},
    )
  }, [data?.taskGroups])

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

  const handleSubmitForm = (values: z.infer<typeof UpdateTaskSchema>) => {
    setError('')

    try {
      startTransition(async () => {
        const res = await updateTask(taskId as string, values)

        if (res?.error) {
          setError(res.error)
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
    if (data?.task) {
      form.setValue('tag', data.task.tag)
      form.setValue('name', data.task.name)
      form.setValue('description', data.task.description)
      form.setValue('groupId', data.task.groupId)
      form.setValue('status', data.task.status)
      form.setValue('remarks', data.task.remarks)
      form.setValue('isDeleted', data.task.isDeleted)

      setRemarkFields(data.task.remarks.length > 0 ? data.task.remarks : [''])
    }
  }, [form, data?.task])

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
              <FormField
                name='groupId'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor='groupId'
                      className='uppercase text-sm font-bold dark:text-zinc-200'
                    >
                      Group
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className='border-none dark:bg-stone-900/50'>
                          <SelectValue placeholder='Select task group' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tasksBoards.map((board) => (
                          <SelectGroup key={board.id}>
                            <SelectLabel className='dark:bg-zinc-900 font-bold'>
                              #
                              <span className='ml-1 text-[0.75rem]'>
                                {board.name}
                              </span>
                            </SelectLabel>
                            {groupOptions &&
                              groupOptions[board.id] &&
                              groupOptions[board.id].map((group) => (
                                <SelectItem key={group.id} value={group.id}>
                                  {group.name}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

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
                      <span>Delete this task</span>
                    </FormLabel>
                  </FormItem>
                )}
              ></FormField>

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

'use client'

import { TaskState, TasksManageStatus } from '@/types'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition, useEffect } from 'react'
import { toast } from 'sonner'

import { X } from 'lucide-react'

import { useModal } from '@/hooks/useModal'

import { updateTask } from '@/actions/tasks-management'

import { EditTaskSchema } from '@/schemas/tasks-management'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { FormError } from '@/components/common/FormError'
import { ActionTooltip } from '@/components/common/ActionTooltip'

import { TASK_STATES } from '@/lib/constant'

export const EditTaskModal = () => {
  const router = useRouter()

  const [error, setError] = useState('')
  const [remarkFields, setRemarkFields] = useState<string[]>([''])
  const [isPending, startTransition] = useTransition()

  const { open, onClose, type, data } = useModal()

  const isOpen = open && type === 'editTask'

  const form = useForm({
    resolver: zodResolver(EditTaskSchema),
    defaultValues: {
      id: '',
      name: '',
      description: '',
      boardId: '',
      state: TaskState.TODO,
      status: 'active' as TasksManageStatus,
      remarks: [] as string[],
    },
  })

  const loading = isPending || form.formState.isSubmitting
  const isDirty = form.formState.isDirty

  const handleRemarkFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newRemarkFields = [...remarkFields]
    newRemarkFields[index] = e.target.value

    if (index === newRemarkFields.length - 1) {
      newRemarkFields.push('')
    }

    setRemarkFields(newRemarkFields)
    form.setValue('remarks', newRemarkFields, { shouldDirty: true })
  }

  const handleRemoveRemarkField = (index: number) => {
    const newRemarkFields = [...remarkFields]
    const filter = newRemarkFields.filter((_, i) => i !== index)

    setRemarkFields(filter)
    form.setValue('remarks', filter, { shouldDirty: true })
  }

  const handleSubmitForm = (values: z.infer<typeof EditTaskSchema>) => {
    setError('')
    startTransition(async () => {
      try {
        const res = await updateTask(values)
        if (res.error) {
          setError(res.error)
          return
        }
        toast.success('Task updated successfully')
        handleClose()
        router.refresh()
      } catch {
        setError('Something went wrong')
      }
    })
  }

  const handleClose = () => {
    setRemarkFields([''])
    form.reset()
    onClose()
  }

  useEffect(() => {
    if (data?.task) {
      form.setValue('id', data.task.id)
      form.setValue('boardId', data.task.boardId)
      form.setValue('name', data.task.name)
      form.setValue('description', data.task.description)
      form.setValue('state', data.task.state)
      form.setValue('remarks', data.task.remarks)

      setRemarkFields([...data.task.remarks, ''])
    }
  }, [form, data])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='p-0 overflow-hidden'>
        <DialogHeader className='pt-8 pb-13 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Edit Task
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Edit a task for the board
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
                  value={data?.board?.name}
                  disabled
                  className='border-none dark:bg-stone-900/50'
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
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id='name'
                        type='text'
                        placeholder='Task name'
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
                        rows={3}
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
                name='state'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-sm font-bold dark:text-zinc-200'>
                      State
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='border-none dark:bg-stone-900/50'>
                          <SelectValue placeholder='Select state' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TASK_STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                name='status'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-sm font-bold dark:text-zinc-200'>
                      Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='border-none dark:bg-stone-900/50'>
                          <SelectValue placeholder='Select status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='active'>Active</SelectItem>
                        <SelectItem value='inactive'>Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className='uppercase text-sm font-bold dark:text-zinc-200'>
                  Remarks
                </FormLabel>
                <div className='h-[200px] w-full space-y-2 overflow-scroll'>
                  {remarkFields.map((remark, index) => (
                    <div
                      key={`remark-${index}`}
                      className='py-1 grid grid-cols-[90%,5%] gap-1'
                    >
                      <Input
                        disabled={loading}
                        value={remark}
                        onChange={(e) => handleRemarkFieldChange(e, index)}
                        placeholder='Task remark'
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
                              variant='outline'
                              size='icon'
                              className='border-none'
                              onClick={() => handleRemoveRemarkField(index)}
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

            <DialogFooter className='bg-stone-900 px-6 py-4'>
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
                disabled={!isDirty || loading}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { TasksManageStatus } from '@/types'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition, useEffect } from 'react'
import { toast } from 'sonner'

import { useModal } from '@/hooks/useModal'

import { EditWorkspaceSchema } from '@/shcemas/tasks-management'

import { updateWorkspace } from '@/actions/tasks-management'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/common/FormError'

export const EditWorkspaceModal = () => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  const { type, open, onClose, data } = useModal()

  const isOpen = type === 'editWorkspace' && open

  const form = useForm({
    resolver: zodResolver(EditWorkspaceSchema),
    defaultValues: {
      id: '',
      name: '',
      description: '',
      status: 'active' as TasksManageStatus,
    },
  })

  const isDirty = form.formState.isDirty
  const loading = isPending || form.formState.isSubmitting

  const handleSubmitForm = (values: z.infer<typeof EditWorkspaceSchema>) => {
    setError('')

    startTransition(async () => {
      try {
        const res = await updateWorkspace(values)

        if (res.error) {
          setError(res.error)
          return
        }

        toast.success('Workspace updated successfully')

        handleClose()
        router.refresh()
      } catch {
        setError('Fail to update workspace')
      }
    })
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  useEffect(() => {
    if (data?.workspace) {
      form.setValue('id', data.workspace.id)
      form.setValue('name', data.workspace.name)
      form.setValue('description', data.workspace.description)
      form.setValue('status', data.workspace.status)
    }
  }, [data?.workspace, form])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='p-0 overflow-hidden'>
        <DialogHeader className='pt-8 pb-13 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Edit workspace
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Workspaces are where you store task boards.
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
                        placeholder='Workspace name'
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
                        placeholder='Workspace description'
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

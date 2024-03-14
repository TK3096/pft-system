'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { useModal } from '@/hooks/useModal'

import { CreateWorkspaceSchema } from '@/shcemas/tasks-management'

import { createWorkspace } from '@/actions/tasks-management'

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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/common/FormError'

export const CreateWorkspaceModal = () => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  const { type, open, onClose } = useModal()

  const isOpen = type === 'createWorkspace' && open

  const form = useForm({
    resolver: zodResolver(CreateWorkspaceSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const isDirty = form.formState.isDirty
  const loading = isPending || form.formState.isSubmitting

  const handleSubmitForm = (values: z.infer<typeof CreateWorkspaceSchema>) => {
    setError('')

    startTransition(async () => {
      try {
        const res = await createWorkspace(values)

        if (res.error) {
          setError(res.error)
          return
        }

        toast.success('Workspace created successfully')

        handleClose()
        router.refresh()
      } catch {
        setError('Fail to create workspace')
      }
    })
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='p-0 overflow-hidden'>
        <DialogHeader className='pt-8 pb-13 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Create a new workspace
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
              {error && <FormError message={error} />}
            </div>

            <DialogFooter className='bg-stone-900 px-6 py-4'>
              <Button type='button' variant='secondary' disabled={loading}>
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

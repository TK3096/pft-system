'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'

import { PlusCircleIcon } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

import { workspaces } from '@/mock-up-data'

interface WorkspaceSwitcherProps {}

export const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = (
  props: WorkspaceSwitcherProps,
) => {
  const {} = props

  const router = useRouter()

  const [selected, setSelected] = useState('')

  const handleValueChange = (value: string) => {
    if (value === 'create') {
      console.log('Create new workspace')

      return
    }

    setSelected(value)

    const url = qs.stringifyUrl({
      url: '/tasks-management',
      query: { b: value },
    })

    router.replace(url)
  }

  return (
    <Select defaultValue={selected} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder='Select a workspace'>
          {workspaces.find((wsp) => wsp.id === selected)?.name ?? ''}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {workspaces.map((wsp) => (
          <SelectItem key={wsp.id} value={wsp.id} className='cursor-pointer'>
            {wsp.name}
          </SelectItem>
        ))}
        <Separator />
        <SelectItem value='create' className='cursor-pointer'>
          <div className='flex items-center'>
            <PlusCircleIcon className='w-4 h-4 mr-2' />
            <span>Create new workspace</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

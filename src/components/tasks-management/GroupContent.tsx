'use client'

import React from 'react'

import { useTasksManagement } from '@/hooks/useTasksManagement'

import { TasksTable } from '@/components/tasks-management/TasksTable'
import { columns } from '@/components/tasks-management/TaskTableColumn'

interface GroupContentProps {
  groupId: string
}

export const GroupContent: React.FC<GroupContentProps> = (
  props: GroupContentProps,
) => {
  const { groupId } = props

  const { tasks } = useTasksManagement()

  const filteredTasks = tasks.filter((task) => task.groupId === groupId)

  return (
    <div className='border-2 my-3 mx-2 border-zinc-800 rounded-lg overflow-hidden'>
      <TasksTable data={filteredTasks} columns={columns} />
    </div>
  )
}

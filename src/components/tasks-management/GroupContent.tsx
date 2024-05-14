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
    <div>
      <TasksTable data={filteredTasks} columns={columns} />
    </div>
  )
}

import { useContext } from 'react'

import TasksManagementContext from '@/providers/TasksManagementProvider'

export const useTasksManagement = () => {
  const context = useContext(TasksManagementContext)

  return context
}

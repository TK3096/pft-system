'use client'

import { TaskBoard } from '@/types'

import { createContext, useEffect, useState } from 'react'

import { taskBoards as taskBoardsData } from '@/mock-up-data'

interface TasksManagementContext {
  taskBoards: TaskBoard[]
}

const defaultValues: TasksManagementContext = {
  taskBoards: [],
}

const TasksManagementContext =
  createContext<TasksManagementContext>(defaultValues)

export const TasksManagementProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [taskBoards, setTaskBoards] = useState<TaskBoard[]>([])

  useEffect(() => {
    setTaskBoards(taskBoardsData)
  }, [])

  const value = {
    taskBoards,
  }

  return (
    <TasksManagementContext.Provider value={value}>
      {children}
    </TasksManagementContext.Provider>
  )
}

export default TasksManagementContext

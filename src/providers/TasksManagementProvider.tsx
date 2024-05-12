'use client'

import { TaskBoard, TaskGroup } from '@/types'

import { createContext, useEffect, useState } from 'react'

import {
  taskBoards as taskBoardsData,
  taskGroups as taskGroupsData,
} from '@/mock-up-data'

interface TasksManagementContext {
  taskBoards: TaskBoard[]
  taskGroups: TaskGroup[]
}

const defaultValues: TasksManagementContext = {
  taskBoards: [],
  taskGroups: [],
}

const TasksManagementContext =
  createContext<TasksManagementContext>(defaultValues)

export const TasksManagementProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [taskBoards, setTaskBoards] = useState<TaskBoard[]>([])
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([])

  useEffect(() => {
    setTaskBoards(taskBoardsData)
    setTaskGroups(taskGroupsData)
  }, [])

  const value = {
    taskBoards,
    taskGroups,
  }

  return (
    <TasksManagementContext.Provider value={value}>
      {children}
    </TasksManagementContext.Provider>
  )
}

export default TasksManagementContext

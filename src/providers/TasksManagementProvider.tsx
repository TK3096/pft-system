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
  isCollapsed: boolean
  onCollapsed: (value: boolean) => void
}

const defaultValues: TasksManagementContext = {
  taskBoards: [],
  taskGroups: [],
  isCollapsed: false,
  onCollapsed: (value: boolean) => {},
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
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  useEffect(() => {
    setTaskBoards(taskBoardsData)
    setTaskGroups(taskGroupsData)
  }, [])

  const value = {
    taskBoards,
    taskGroups,
    isCollapsed,
    onCollapsed: setIsCollapsed,
  }

  return (
    <TasksManagementContext.Provider value={value}>
      {children}
    </TasksManagementContext.Provider>
  )
}

export default TasksManagementContext

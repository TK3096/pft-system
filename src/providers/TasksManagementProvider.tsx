'use client'

import { TaskBoard, TaskGroup, Task } from '@/types'

import { createContext, useEffect, useState } from 'react'

import {
  taskBoards as taskBoardsData,
  taskGroups as taskGroupsData,
  tasks as tasksData,
} from '@/mock-up-data'

interface TasksManagementContext {
  taskBoards: TaskBoard[]
  taskGroups: TaskGroup[]
  tasks: Task[]
  isCollapsed: boolean
  onCollapsed: (value: boolean) => void
}

const defaultValues: TasksManagementContext = {
  taskBoards: [],
  taskGroups: [],
  tasks: [],
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
  const [tasks, setTaskss] = useState<Task[]>([])
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  useEffect(() => {
    setTaskBoards(taskBoardsData)
    setTaskGroups(taskGroupsData)
    setTaskss(tasksData)
  }, [])

  const value = {
    taskBoards,
    taskGroups,
    tasks,
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

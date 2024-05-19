'use client'

import { TaskBoard, TaskGroup, Task } from '@/types'

import { createContext, useEffect, useState, useMemo } from 'react'
import dayjs from 'dayjs'

import { getDocuments } from '@/lib/firebase/db'

import {
  TASKS_COLLECTION,
  TASK_BOARDS_COLLECTION,
  TASK_GROUPS_COLLECTION,
} from '@/lib/constant'

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
  const [tasks, setTasks] = useState<Task[]>([])
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  const sortedAndFilterTaskBoards = useMemo(() => {
    const filter = taskBoards.filter((b) => !b.isDeleted)

    return filter.sort(
      (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
    )
  }, [taskBoards])

  const sortedAndFilterTaskGroups = useMemo(() => {
    const filter = taskGroups.filter((b) => !b.isDeleted)

    return filter.sort(
      (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
    )
  }, [taskGroups])

  const filterTasks = useMemo(() => {
    return tasks.filter((b) => !b.isDeleted)
  }, [tasks])

  useEffect(() => {
    const unsubscribeTaskBoards = getDocuments(
      TASK_BOARDS_COLLECTION,
      (doc) => {
        const { name, description, isDeleted, owner, createdAt, updatedAt } =
          doc.data()

        setTaskBoards((prev) => {
          const index = prev.findIndex((w) => w.id === doc.id)

          const newData: TaskBoard = {
            id: doc.id,
            name,
            description,
            isDeleted,
            owner,
            createdAt,
            updatedAt,
          }

          if (index !== -1) {
            const temp = [...prev]
            temp[index] = newData

            return temp
          }

          return [...prev, newData]
        })
      },
    )

    const unsubscribeTaskGroups = getDocuments(
      TASK_GROUPS_COLLECTION,
      (doc) => {
        const {
          name,
          description,
          isDeleted,
          boardId,
          owner,
          createdAt,
          updatedAt,
        } = doc.data()

        setTaskGroups((prev) => {
          const index = prev.findIndex((b) => b.id === doc.id)

          const newData: TaskGroup = {
            id: doc.id,
            name,
            description,
            isDeleted,
            boardId,
            owner,
            createdAt,
            updatedAt,
          }

          if (index !== -1) {
            const temp = [...prev]
            temp[index] = newData

            return temp
          }

          return [...prev, newData]
        })
      },
    )

    const unsubscribeTasks = getDocuments(TASKS_COLLECTION, (doc) => {
      const {
        name,
        tag,
        description,
        status,
        isDeleted,
        groupId,
        owner,
        remarks,
        createdAt,
        updatedAt,
      } = doc.data()

      setTasks((prev) => {
        const index = prev.findIndex((b) => b.id === doc.id)

        const newData: Task = {
          id: doc.id,
          name,
          tag,
          description,
          status,
          groupId,
          isDeleted,
          remarks,
          owner,
          createdAt,
          updatedAt,
        }

        if (index !== -1) {
          const temp = [...prev]
          temp[index] = newData

          return temp
        }

        return [...prev, newData]
      })
    })

    return () => {
      unsubscribeTaskBoards()
      unsubscribeTaskGroups()
      unsubscribeTasks()
    }
  }, [])

  const value = {
    taskBoards: sortedAndFilterTaskBoards,
    taskGroups: sortedAndFilterTaskGroups,
    tasks: filterTasks,
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

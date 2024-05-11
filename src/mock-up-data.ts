import dayjs from 'dayjs'
import { TaskBoard } from './types'

export const taskBoards: TaskBoard[] = [
  {
    id: crypto.randomUUID(),
    name: 'Task Board 1',
    description: 'Description of Task Board 1',
    isDeleted: false,
    owner: 'user1',
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
  },
  {
    id: crypto.randomUUID(),
    name: 'Task Board 2',
    description: 'Description of Task Board 2',
    isDeleted: false,
    owner: 'user1',
    createdAt: dayjs().add(1, 'day').toString(),
    updatedAt: dayjs().add(1, 'day').toString(),
  },
  {
    id: crypto.randomUUID(),
    name: 'Task Board 3',
    description: 'Description of Task Board 3',
    isDeleted: false,
    owner: 'user1',
    createdAt: dayjs().add(2, 'day').toString(),
    updatedAt: dayjs().add(2, 'day').toString(),
  },
]

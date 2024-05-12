import dayjs from 'dayjs'
import { TaskBoard, TaskGroup } from './types'

export const taskBoards: TaskBoard[] = [
  {
    id: '816e0b0c-3e3a-4b8c-b2fc-2e168e9f7761',
    name: 'Task Board 1',
    description: 'Description of Task Board 1',
    isDeleted: false,
    owner: 'user1',
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
  },
  {
    id: '31b0933e-fd87-443f-a73f-c5c284889e07',
    name: 'Task Board 2',
    description: 'Description of Task Board 2',
    isDeleted: false,
    owner: 'user1',
    createdAt: dayjs().add(1, 'day').toString(),
    updatedAt: dayjs().add(1, 'day').toString(),
  },
  {
    id: 'bcea23c5-c43c-4174-8e6e-c52bd1abbb66',
    name: 'Task Board 3',
    description: 'Description of Task Board 3',
    isDeleted: false,
    owner: 'user1',
    createdAt: dayjs().add(2, 'day').toString(),
    updatedAt: dayjs().add(2, 'day').toString(),
  },
]

export const taskGroups: TaskGroup[] = [
  {
    id: '816e0b0c-3e3a-4b8c-b2fc-2e168e9f7123',
    bordId: '816e0b0c-3e3a-4b8c-b2fc-2e168e9f7761',
    name: 'board 1 group 1',
    description: 'Description of board 1 group 1',
    owner: 'user1',
    isDeleted: false,
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
  },
  {
    id: '816e0b0c-3e3a-4b8c-b2fc-2e168e9f7456',
    bordId: '816e0b0c-3e3a-4b8c-b2fc-2e168e9f7761',
    name: 'board 1 group 2',
    description: 'Description of board 1 group 2',
    owner: 'user1',
    isDeleted: false,
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
  },
  {
    id: '816e0b0c-3e3a-4b8c-b2fc-2e168e9f7999',
    bordId: '31b0933e-fd87-443f-a73f-c5c284889e07',
    name: 'board 2 group 3',
    description: 'Description of board 2 group 3',
    owner: 'user1',
    isDeleted: false,
    createdAt: dayjs().add(2, 'day').toString(),
    updatedAt: dayjs().toString(),
  },
]

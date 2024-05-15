import dayjs from 'dayjs'
import { TaskBoard, TaskGroup, Task, TaskStatus } from './types'

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
    boardId: '816e0b0c-3e3a-4b8c-b2fc-2e168e9f7761',
    name: 'board 1 group 1',
    description: 'Description of board 1 group 1',
    owner: 'user1',
    isDeleted: false,
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
  },
  {
    id: '816e0b0c-3e3a-4b8c-b2fc-2e168e9f7456',
    boardId: '816e0b0c-3e3a-4b8c-b2fc-2e168e9f7761',
    name: 'board 1 group 2',
    description: 'Description of board 1 group 2',
    owner: 'user1',
    isDeleted: false,
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
  },
  {
    id: '816e0b0c-3e3a-4b8c-b2fc-2e168e9f7999',
    boardId: '31b0933e-fd87-443f-a73f-c5c284889e07',
    name: 'board 2 group 3',
    description: 'Description of board 2 group 3',
    owner: 'user1',
    isDeleted: false,
    createdAt: dayjs().add(2, 'day').toString(),
    updatedAt: dayjs().toString(),
  },
]

export const tasks: Task[] = [
  {
    id: '816e0b0c-3e3a-4b8c-b2fc-2e1a9f7123',
    groupId: '816e0b0c-3e3a-4b8c-b2fc-2e168e9f7123',
    tag: 'Bug',
    name: 'Task 1 qweqweqweqweqweqweqwekllsad',
    description: 'Task 1 description',
    isDeleted: false,
    status: TaskStatus.TODO,
    owner: 'user1',
    remarks: [],
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
  },
  {
    id: '816e0b0c-3e3a-4b8c-b2fc-2e1a9f7124',
    groupId: '816e0b0c-3e3a-4b8c-b2fc-2e168e9f7123',
    tag: 'Feature',
    name: 'Task 2',
    description: 'Task 2 description',
    isDeleted: false,
    status: TaskStatus.IN_PROGRESS,
    owner: 'user1',
    remarks: [],
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
  },
  {
    id: '816e0b0c-3e3a-4b8c-b2fc-2e1a9f7125',
    groupId: '816e0b0c-3e3a-4b8c-b2fc-2e168e9f7123',
    tag: 'Feature',
    name: 'Task 3',
    description: 'Task 3 description',
    isDeleted: false,
    status: TaskStatus.TESTING,
    owner: 'user1',
    remarks: [],
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
  },
  {
    id: '816e0b0c-3e3a-4b8c-b2fc-2e1a9f7126',
    groupId: '816e0b0c-3e3a-4b8c-b2fc-2e168e9f7123',
    tag: 'Document',
    name: 'Task 4',
    description: 'Task 4 description',
    isDeleted: false,
    status: TaskStatus.DONE,
    owner: 'user1',
    remarks: ['remark 1', 'remark 2', 'remark 3'],
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
  },
]

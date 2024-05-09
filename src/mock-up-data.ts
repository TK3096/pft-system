import dayjs from 'dayjs'
import { Workspace } from './types'

export const workspaces: Workspace[] = [
  {
    id: crypto.randomUUID(),
    name: 'Example Workspace',
    description: 'This is an example workspace',
    owner: 'John Doe',
    isDelete: false,
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
  },
  {
    id: crypto.randomUUID(),
    name: 'Example Workspace 2',
    description: 'This is an example workspace 2',
    owner: 'John Doe',
    isDelete: false,
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
  },
]

export type RouteType = 'public' | 'private'

export type ApiResponse<T = object> =
  | { status: true; data: T }
  | { status: false; error: string }

export enum PortfolioRank {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
}

export interface Portfolio {
  id: string
  name: string
  owner: string
  repo: string
  rank: PortfolioRank
  src: string
  demo?: string
  createdAt: number
}

export interface TaskBoard {
  id: string
  name: string
  description: string
  isDeleted: boolean
  owner: string
  createdAt: string
  updatedAt: string
}

export interface TaskGroup {
  id: string
  boardId: string
  name: string
  description: string
  owner: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  TESTING = 'testing',
  DONE = 'done',
}

export interface Task {
  id: string
  groupId: string
  tag: string
  name: string
  description: string
  isDeleted: boolean
  status: TaskStatus
  owner: string
  remarks: string[]
  createdAt: string
  updatedAt: string
}

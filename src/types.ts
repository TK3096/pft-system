export type RouteType = 'public' | 'private'

export type TasksManageStatus = 'active' | 'inactive'

export interface Workspace {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive'
  owner: string
  createdAt: number
  updatedAt: number
}

export interface Board {
  id: string
  name: string
  description: string
  workspaceId: string
  status: 'active' | 'inactive'
  owner: string
  createdAt: number
  updatedAt: number
}

export interface Task {
  id: string
  name: string
  description: string
  boardId: string
  status: 'active' | 'inactive'
  state: TaskState
  owner: string
  remarks: string[]
  createdAt: number
  updatedAt: number
}

export enum TaskState {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  REVIEW = 'review',
  DONE = 'done',
}

export enum PortfolioRank {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
}

export interface Portfolio {
  id: string
  name: string
  readmeUrl: string
  rank: PortfolioRank
  src: string
  demo?: string
}

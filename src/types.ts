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

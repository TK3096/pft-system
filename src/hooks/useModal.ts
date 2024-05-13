import { TaskBoard } from '@/types'

import { create } from 'zustand'

export type ModalType =
  | 'create-task-board'
  | 'update-task-board'
  | 'create-task-group'
  | 'update-task-group'

interface ModalData {
  taskBoard: TaskBoard
}

interface ModalStore {
  type: ModalType | null
  data?: ModalData
  open: boolean
  onOpen: (type: ModalType | null, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: undefined,
  open: false,
  onOpen: (type, data) => set({ type, open: true, data }),
  onClose: () => set({ open: false, type: null, data: undefined }),
}))

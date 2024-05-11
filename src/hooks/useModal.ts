import { create } from 'zustand'

export type ModalType = 'create-task-board'

interface ModalData {}

interface ModalStore {
  type: ModalType | null
  data?: ModalData
  open: boolean
  onOpen: (type: ModalType | null, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  open: false,
  onOpen: (type, data) => set({ type, open: true, data }),
  onClose: () => set({ open: false }),
}))

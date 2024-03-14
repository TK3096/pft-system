import { create } from 'zustand'

export type ModalType = 'createWorkspace'

interface ModalStore {
  type: ModalType | null
  open: boolean
  onOpen: (type: ModalType | null) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  open: false,
  onOpen: (type) => set({ type, open: true }),
  onClose: () => set({ open: false }),
}))

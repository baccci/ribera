import create from 'zustand'
import { persist } from 'zustand/middleware'

interface ConfigStore {
  showAnnouncement: boolean
  setShowAnnouncement: (show: boolean) => void
}

export const useConfig = create(
  persist<ConfigStore>(
    (set) => ({
      showAnnouncement: true,
      setShowAnnouncement: (show) => set({ showAnnouncement: show })
    }),
    { name: 'config' }
  )
)

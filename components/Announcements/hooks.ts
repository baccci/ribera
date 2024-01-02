import React from 'react'
import { useConfig as useConfigStore } from '@/store/configStore'

// In order to avoid hydration mismatch 
// when listening to the store in a component,
// is needed to use a separate state
// and listen for updates from the store

export const useConfig = () => {
  const [showAnnouncement, setTotal] = React.useState(false)
  const { setShowAnnouncement, showAnnouncement: show } = useConfigStore()

  React.useEffect(() => {
    setTotal(show)
  }, [show])

  return { showAnnouncement, setShowAnnouncement }
}
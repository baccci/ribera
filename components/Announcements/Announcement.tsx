'use client'
import React from 'react'
import { useConfig } from './hooks'
import { CloseIcon } from '../Icons'
import { Button } from '../Button'

interface AnnouncementProps {
  message: string
}

export const Announcement: React.FC<AnnouncementProps> = ({ message }) => {
  const { showAnnouncement, setShowAnnouncement } = useConfig()

  const handleClick = () => {
    setShowAnnouncement(false)
  }
  
  if(!showAnnouncement) return null
  return (
      <div className='text-white bg-black flex justify-center items-center py-1 relative'>
        <p>{message}</p>
        <Button className='absolute right-3 p-0 h-auto hover:bg-transparent' onClick={handleClick} title='cerrar'>
          <CloseIcon size={24} />
        </Button>
      </div>
  )
}

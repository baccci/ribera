import Link from 'next/link'
import React from 'react'
import { LogoIcon } from './Icons'

interface LogoProps {
  width?: number
  height?: number
  color?: string
  className?: string
  link?: boolean
}

const Logo: React.FC<LogoProps> = ({ width = 100, height = 56, color = 'currentColor', className, link = true }) => {

  if(!link) return <LogoIcon width={width} height={height} color={color} className={className}/>
  return <LinkLogo width={width} height={height} color={color} className={className} />
}

export default Logo

const LinkLogo: React.FC<Omit<LogoProps, 'link'>> = (props) => {
  return (
    <Link href='/'>
      <LogoIcon {...props}/>
    </Link>
  )
}
import React from 'react'

const XButton = ({func}: {func?: () => void}) => {
  return (
    <div onClick={() => func && func()}>
      <XButtonSVG/>
      <style jsx>
        {`
          div{
            padding: 5px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color .2s ease-out;
            width: 22px;
            height: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          div:hover{
            background-color: #f2f2f2;
          }
        `}
      </style>
    </div>
  )
}

export default XButton

const XButtonSVG = () => {
  return(
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path d="M11.622,9.255,8.367,6l3.254-3.255a1.291,1.291,0,0,0,0-1.827l-.54-.54a1.291,1.291,0,0,0-1.827,0L6,3.633,2.746.379a1.291,1.291,0,0,0-1.827,0l-.54.54a1.291,1.291,0,0,0,0,1.827L3.633,6,.379,9.255a1.291,1.291,0,0,0,0,1.827l.54.54a1.292,1.292,0,0,0,1.827,0L6,8.367l3.254,3.255a1.292,1.292,0,0,0,1.827,0l.54-.54a1.291,1.291,0,0,0,0-1.827" fill="#3d3d3d" />
    </svg>
  )
}
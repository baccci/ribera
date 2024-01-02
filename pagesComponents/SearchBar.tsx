import React, { useState } from 'react'

const SearchBar = ({ placeholder = '', onKeyDown, handleSearchFunc }: {placeholder?: string, onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>, value:string) => void, handleSearchFunc?: (value: string) => void}) => {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClick = () => {
    handleSearchFunc && handleSearchFunc(value)
  }

  return (
    <div className='wrapper'>
      <input className='searchBar' type="text" value={value} onChange={handleChange} {...{ placeholder }} onKeyDown={(e) => onKeyDown && onKeyDown(e, value)}/>
      <div className='lens' onClick={handleClick}>
       <LensSvg />
      </div>
      <style jsx>
        {`
        .wrapper{
          display: flex;
          align-items: center;
          width: 460px;
          height: 47px;
          border-radius: 12px;
          background-color: var(--light-gray2);
          padding: 0 18px;
          transition: all 0.2s ease-out;
        }
        .wrapper:hover{
          background-color: #f2f0f0;
        }
        .lens{
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .searchBar{
          box-sizing: border-box;
          font-family: 'Rawson', system-ui, "Segoe UI", sans-serif;
          background-color: transparent;
          border: none;
          outline: none;
          font-size: 16px;
          width: 100%;
        }
        .searchBar::placeholder{
          color: var(--light-gray);
          font-weight: 500;
          font-size: 16px;
        }`}
      </style>
    </div>
  )
}

export default SearchBar

const LensSvg = () => {
  return (
    <svg width="20.414" height="20.414" viewBox="0 0 20.414 20.414">
      <g transform="translate(-2 -2)">
        <circle cx="8" cy="8" r="8" transform="translate(3 3)" fill="none" stroke="#979797" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <line x1="4.35" y1="4.35" transform="translate(16.65 16.65)" fill="none" stroke="#979797" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
      <style jsx>
        {`
        svg{
          cursor: pointer;
        }
        `}
      </style>
    </svg>
  )
}
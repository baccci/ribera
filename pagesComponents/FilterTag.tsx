
const FilterTag = ({children, text, selected = false, onClick, name}: {children: React.ReactNode, text: string, selected?: boolean, onClick?: (key: string) => void, name: string}) => {
  return (
    <div onClick={() => onClick && onClick(name)}>
      {children}{text}
      <style jsx>
        {`
        div{
          display: flex;
          padding: 0 12px;
          height: 32px;
          border-radius: 16px;
          background-color: ${!selected ? 'var(--light-gray3)' : 'var(--light-yellow)'};
          align-items: center;
          font-family: 'Rawson', system-ui, "Segoe UI", sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: ${!selected ? 'var(--black)' : 'var(--yellow)'};
          gap: 8px;
          cursor: pointer;
          user-select: none;
        },
        `}
      </style>
    </div>
  )
}

export default FilterTag
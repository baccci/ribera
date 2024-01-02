import { useState, useEffect } from 'react'

const AddButton = ({ text, addFunc, restFunc, count = 0, border = true }: {text: string, addFunc: () => void, restFunc: () => void, count: number, border?: boolean}) => {
  const [showButton, setShowButton] = useState(false)

  const handleClick = () => {
    setShowButton(true)
  }

  useEffect(() => {
    if(count > 0) {
      setShowButton(true)
    }else{
      setShowButton(false)
    }
  }, [count])

  return (
    <>
      {
        showButton
          ? <div className='buttonsWrapper'>
          <div className='button' onClick={restFunc}>
              <div className='svgWrapper'>
                <svg width="8.379" height="2.568" viewBox="0 0 8.379 2.568">
                  <rect width="8.379" height="2.568" fill="#3d3d3d" />
                </svg>
              </div>
          </div>
          <span className='count'>{count}</span>
          <div className='button' onClick={addFunc}>
            <div className='svgWrapper'>
              <svg width="9.031" height="9.031" viewBox="0 0 9.031 9.031">
                <path d="M3.15,0v3.15H0v2.73H3.15v3.15H5.88V5.881h3.15V3.151H5.88V0Z" transform="translate(0 0)" fill="#3d3d3d" />
              </svg>
            </div>
          </div>
        </div>
          : <div onClick={handleClick} className='text'>
          {text.toUpperCase()}
        </div>
      }
      <style jsx>
        {`
        .svgWrapper{
          height: 100%;
          position: absolute;
          top: 0;
          display: flex;
          align-items: center;
        }
        svg{
          margin: auto 0;
          position: relative;
          top: 2px;
        }
        div, span {
          font-family: 'Rawson', system-ui, "Segoe UI", sans-serif;
        }
        .text{
          font-size: 14px;
          font-weight: 700;
          color: var(--gray);
          cursor: pointer;
        }
        .buttonsWrapper{
          border: ${border ? '2px solid #E7E8E7' : 'none'};
          border-radius: 10px;
          width: 100px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          ${border ? 'width: 100%;' : ''}
          padding: ${border ? '0 20px' : '0'};
          position: relative;
        }
        .button{
          border: none;
          outline: none;
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;

          justify-content: center;
          height: 32px;
          width: 32px;
          border-radius: 9999px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 700;
          background-color: ${border ? 'transparent' : '#EFEFEF'};
          transition: background .2s ease-out;
          text-align: center;
          user-select: none;
          font-family: system-ui, "Segoe UI", sans-serif;
          padding: 0;
        }
        .button:hover{
          background-color: #EFEFEF;
        }
        .button > * {
          position: relative;
          top: -2px;
        }
        .count{
          font-size: 20px;
          font-weight: 700;
          color: var(--gray);
        }
        `}
      </style>
    </>
  )
}

export default AddButton
import { Waveform } from '@uiball/loaders'

type ButtonType = 'button' | 'submit' | 'reset' | undefined

type ButtonStyle = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
  type?: ButtonType, 
  children?: React.ReactNode, 
  func?: () => void,
  width?: string,
  buttonStyle?: ButtonStyle,
  padding?: string,
  disabled?: boolean,
  loading?: boolean
}

const Button = ({ type = 'button', children, func, width, buttonStyle = 'primary', padding, disabled, loading }: ButtonProps) => {
  const styleRules = {
    backgroundColor: 'var(--black);',
    color: 'white',
    border: 'none',
    hoverBackgroundColor: 'var(--gray)'
  }

  switch (buttonStyle) {
    case 'secondary':
      styleRules.backgroundColor = 'var(--white);'
      styleRules.color = 'var(--black);'
      styleRules.border = '3px solid var(--black);'
      styleRules.hoverBackgroundColor = 'var(--black)'
      break
    case 'tertiary':
      styleRules.backgroundColor = 'transparent'
      styleRules.color = 'var(--gray);'
      styleRules.border = 'none'
      styleRules.hoverBackgroundColor = 'var(--gray)'
      break
    default:
      break
  }

  const handleClick = () => func && func()

  return (
    <button {...{ type }} onClick={() => handleClick()} disabled={disabled}>
      {!loading ? children : <Waveform color="white" size={20} lineWeight={2}/>}
      <style jsx>
        {`button{
            box-sizing: border-box;
            font-size: 16px;
            font-weight: 600;
            padding: ${padding || '0px 24px;'};
            height: 40px;
            border-radius: 10px;
            cursor: pointer;
            font-family: 'Rawson', system-ui, 'Segoe UI', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
            ${width ? `width: ${width};` : ''}
            background-color: ${styleRules.backgroundColor};
            color: ${styleRules.color};
            border: ${styleRules.border};
            opacity: ${disabled ? '0.5' : '1'};
            transition: background-color 0.2s ease-out;
        }
        button:hover{
          background-color: ${styleRules.hoverBackgroundColor};
        }`}
      </style>
    </button>
  )
}

export default Button
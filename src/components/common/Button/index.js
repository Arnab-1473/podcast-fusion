import React from 'react'
import "./styles.css"

function Button({ text, onClick, disabled, width }) {
  return (
    <div onClick={onClick}
      disabled={disabled}
      className='custom-btn'
      style={{ width: width }}
    >
      {text}
    </div>
  )
}

export default Button

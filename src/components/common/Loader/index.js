import React from 'react'
import "./styles.css"
import CircularProgressWithLabel from '@mui/material/CircularProgress';

function Loader() {
  return (
    <div className='wrapper'>
     <CircularProgressWithLabel  />
    </div>
  )
}

export default Loader

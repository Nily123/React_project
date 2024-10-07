import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div className='cat_div'>
        <img src="../public/CAT/C0.png" className='cat c0'></img>  
        <img src="../public/CAT/CAT1.gif" className='cat c1'></img>
        <img src="../public/CAT/CAT2.gif" className='cat c2'></img>
        <img src="../public/CAT/CAT3.gif" className='cat c3'></img>  
      </div>
    </>
  )
}

export default App

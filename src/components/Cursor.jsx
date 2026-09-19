import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useState } from 'react'

const Cursor = () => {
   const [position, setPosition] = useState({x:0,y:0}) 

   useEffect(() => {
     const mouseMove=(e)=>{
        setPosition({ x : e.clientX+5 , y : e.clientY+16 });
     }
     window.addEventListener('mousemove',mouseMove)
   
     return () => {
       window.removeEventListener("mousemove",mouseMove)
     }
     console.log(position); 
   }, [])
   
  return (
    <motion.div className='hidden  md:flex w-14 h-14 rounded-full fixed z-[99999] border-2 border-slate-400' animate={{x:position.x,y:position.y}}></motion.div>
  )
}
export default Cursor
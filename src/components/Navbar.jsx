import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { FaDiagramProject } from "react-icons/fa6";
import { BiSolidPhoneIncoming } from "react-icons/bi";
import { MdCloseFullscreen } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBriefcase } from "react-icons/fa";
import { motion, useAnimation } from 'framer-motion';

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(false)
    return (
        <motion.div className='z-[9999] relative'  >
            {isVisible ?

                <div className='flex justify-center items-center '>

                    <motion.div className="bg-gradient-to-r from-[var(--gradientBlue)] to-[var(--gradientPink)] text-[var(--primaryBright)] bg-opacity- flex text-primaryBright justify-center items-center h-[60px] w-[400px] bottom-8 fixed rounded-full 
                    "
                        initial={{ width: 60 }}
                        animate={{ width: 400 }}
                        transition={{ duration: 1 }}>
                        <motion.ul initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="navLinks flex gap-x-14">
                            <motion.a href='#home' initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }} className="navLink text-2xl text-white hover:text-[var(--primaryBlue)] cursor-pointer">
                                <FaHome /></motion.a>

                            <motion.a href='#about' initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }} className="navLink text-2xl text-white hover:text-[var(--primaryBlue)]  cursor-pointer">
                                <FaDiagramProject /></motion.a>
                            <motion.a href='#project' initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }} className="navLink text-2xl text-white hover:text-[var(--primaryBlue)] cursor-pointer">
                                <FaBriefcase /></motion.a>
                            <motion.a href='#contact' initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }} className="navLink text-2xl text-white hover:text-[var(--primaryBlue)] cursor-pointer"><BiSolidPhoneIncoming /></motion.a>
                            <motion.button initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }} className="navLink text-2xl  text-white hover:text-[var(--primaryBlue)] cursor-pointer" onClick={() => setIsVisible(!isVisible)}><MdCloseFullscreen />
                            </motion.button>
                        </motion.ul>
                    </motion.div>
                </div>
                :
                <div className='flex justify-center items-center '>

                    <motion.div className="bg-gradient-to-r from-[var(--gradientBlue)] to-[var(--gradientPink)] text-[var(--primaryBright)] bg-opacity- flex text-primaryBright justify-center items-center h-[60px] w-[60px] bottom-8 fixed rounded-full 
                    
                    " initial={{ width: 400, opacity: 0 }}
                        animate={{ width: 60, opacity: 1 }}
                        transition={{ duration: 1 }}>
                        <motion.button initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 ,duration: 1.1}} className="navLink text-2xl  hover:text-[var(--primaryBlue)] cursor-pointer" onClick={() => setIsVisible(!isVisible)}><GiHamburgerMenu />
                        </motion.button>
                    </motion.div>
                </div>
            }
        </motion.div>

    );
}

export default Navbar
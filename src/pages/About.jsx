"use client";
import React, { useState } from 'react'
import Lottie from 'lottie-react'
import aboutMe from "../assets/aboutMe.json"
import ProgressBars from '../components/ProgressBars';
import EducationLine from '../components/EducationLine';
import Certifications from '../components/Certifications';
import { motion } from 'framer-motion';

const textVariants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
}


const About = () => {
  const [active, setActive] = useState('skills');
  console.log(active)

  const activeClasses = 'flex p-4 text-blue-600 border-b-2 border-blue-600 active text-transparent bg-clip-text bg-gradient-to-r from-[var(--gradientBlue)] to-[var(--gradientPink)]';
  const nonActiveClasses = 'p-4 border-b-2 border-transparent  hover:text-gray-300 hover:border-gray-300  ';
  return (
    <div className=' px-8 md:px-24 bg-[var(--primaryDark)] bg-cover bg-center h-screen w-[100%] flex text-white justify-center'>
      <motion.div className="aboutLeft z-40 hidden w-0 md:w-[45%] md:flex md:items-center justify-start"
        variants={textVariants}
        initial='initial'
        whileInView='animate'>
        <Lottie animationData={aboutMe} loop={true} />
      </motion.div>
      <div className="aboutRight z-40 mt-12 w-[100%]  md:w-[55%] ">
        <div className="text-base font-medium text-center text-gray-500 border-b border-gray-200  dark:text-gray-400 dark:border-gray-700 ">
          <ul className="flex justify-center lg:justify-start font-bold ">
            <li className="me-2 ">
              <button className={active == "skills" ? `${activeClasses}` : `${nonActiveClasses}`}
                onClick={() => setActive("skills")}>Skills</button>
            </li>
            <li className="me-2">
              <button className={active == "education" ? `${activeClasses}` : `${nonActiveClasses}`}
                onClick={() => setActive("education")}>Education</button>
            </li>
            <li className="me-2">
              <button className={active == "certification" ? `${activeClasses}` : `${nonActiveClasses}`}
                onClick={() => setActive("certification")}>Certifications</button>
            </li>
          </ul>
        </div>
        <div className='aboutScroll overflow-y-scroll  max-h-[640px] md:-bottom-5 md:max-h-[550px]'>

          {active == "skills" && <ProgressBars />}
          {active == "education" && <EducationLine />}
          {active == "certification" && <Certifications />}
        </div>
      </div>
    </div>
  )
}

export default About
"use client"
import React, { useCallback, useRef } from 'react'
import Lottie from 'lottie-react'
import developer from "../assets/developer.json"
import { TypeAnimation } from 'react-type-animation'
import { FaFileDownload } from "react-icons/fa";
import { motion, useInView } from "framer-motion"
import { loadFull } from 'tsparticles'
import { loadSlim } from "tsparticles-slim";
import Particles from 'react-tsparticles'

const textVariants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 3,
      staggerChildren: 0.1,
    },
  },
}

const imgVariants = {
  initial: {
    x: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 3,
      staggerChildren: 0.1,
    },
  },
}

const btnVariants = {
  initial: {
    y: 500,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 3,
      staggerChildren: 1,
    },
  },
}


const Home = () => {

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);
  return (
    <div className=''>
      
        
      <div className=' px-4 pt-12 md:mt-0 bg-[#181818]  bg-cover bg-center  overflow-hidden  h-screen w-[100%]  flex-col-reverse items-center justify-center text-white flex-wrap md:flex md:flex-row md:px-24 md:pt-0'>
      <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            // background: {
            //     color: {
            //         value: "#0d47a1",
            //     },
            // },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 150,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 6,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 1200,
                },
                value: 100,
              },
              opacity: {
                value: 0.2,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 2 },
              },
            },
            detectRetina: true,
          }}
        />

        <motion.div className="homeLeft z-40 flex flex-col   w-full items-center justify-center md:w-[60%] md:items-start" variants={textVariants} initial='initial' animate="animate" >
          <div className="personalDetails mb-10 flex flex-col  ">
            <motion.span className=' font-bold text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-[var(--gradientBlue)] to-[var(--gradientPink)] md:text-start  md:text-5xl ' variants={textVariants}>Hello World! I'm <br /></motion.span>
            <motion.div className="text-4xl text-center  mt-2 font-bold  text-white  md:text-7xl md:text-start " variants={textVariants}>
              <TypeAnimation
                sequence={[
                  '',
                  1000,
                  'Chandraj',
                  1500,
                  'a Developer',
                  1500,
                  'a Student',
                  1500,
                  'a Programmer',
                  1500
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>
          </div>
          <motion.p className='text-lg font-light text-gray-400  tracking-wider text-center md:text-start' variants={textVariants}>Enthusiastic developer with a knack for turning ideas into engaging experiences. I love crafting user-friendly apps that blend creativity with functionality, using my skills in coding to bring digital visions to life. Let's build something awesome together!</motion.p>
          <motion.div className="buttonsLeft mt-10 gap-6 flex" variants={btnVariants} initial='initial' animate='animate'>
            <motion.button className='flex justify-center items-center gap-x-4  h-[45px] px-6 font-medium text-sm md:text-xl  rounded-full bg-gradient-to-r from-[var(--gradientBlue)] to-[var(--gradientPink)] hover:text-slate-200 text-white' variants={btnVariants} >
              Download CV<FaFileDownload />
            </motion.button>
            <motion.a href='#contact' className='flex justify-center items-center gap-x-4 h-[45px] px-6 font-medium text-sm md:text-xl border rounded-full text-gray-300 border-gray-400 hover:bg-gradient-to-r hover:from-[var(--gradientBlue)] hover:to-[var(--gradientPink)] hover:text-white' variants={btnVariants} >Contact Me</motion.a>
          </motion.div>
        </motion.div>
        <motion.div className="z-40 homeRight md:w-[40%] mt-5 md:mt-0 flex justify-center items-center" variants={imgVariants} initial='initial' animate='animate'>
          <motion.div className="homeImg w-[250px] h-[250px]  md:w-[500px] md:h-[500px] rounded-tl-full rounded-tr-full rounded-br-full rounded-bl-[2000px] flex items-center justify-center bg-gray-600  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 " variants={imgVariants}>
            <Lottie animationData={developer} loop={true} />
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}

export default Home
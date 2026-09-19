import React, { useRef } from 'react'
import eventhub from "../assets/eventhub.png"
import ecommerce from "../assets/ecommerce.png"
import connect from "../assets/connect.png"
import studentportal from "../assets/studentportal.png"
import todo from "../assets/todo.png"
import olx from "../assets/olx.png"
import restmenu from "../assets/restmenu.png"
import travels from "../assets/travels.png"
import { motion, useInView } from 'framer-motion'



const projects = [
  {
    "title": "EventHub",
    "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam, tempore.",
    "techs": ["ReactJs", "Tailwind", "Firebase", "NodeJs"],
    "img": eventhub
  },
  {
    "title": "eCommerce App",
    "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam, tempore.",
    "techs": ["ReactJs", "CSS", "NodeJs"],
    "img":ecommerce

  },
  {
    "title": "Connect",
    "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam, tempore.",
    "techs": ["HTML", "CSS","JavaScript"],
    "img": connect

  },
  {
    "title": "Student Portal",
    "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam, tempore.",
    "techs": ["HTML", "CSS"],
    "img":studentportal

  },
  {
    "title": "Todo",
    "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam, tempore.",
    "techs": ["HTML", "CSS", "JavaScript", "LocalStorage"],
    "img":todo

  },
  {
    "title": "OLX Clone",
    "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam, tempore.",
    "techs": ["HTML", "CSS"],
    "img":olx

  },
  
  {
    "title": "Restraunt Menu",
    "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam, tempore.",
    "techs": ["HTML", "CSS"],
    "img":restmenu

  },
  {
    "title": "Travels Landing Page",
    "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam, tempore.",
    "techs": ["HTML", "CSS"],
    "img":travels

  },

];


const Project = () => {
  const ref=useRef(null);
  const isInView=useInView(ref,{once:true});
  const cardVariants={
    initial:{y:50, opacity:0},
    animate:{y:0, opacity:1},
  };

  return (
    <div className='z-40 px-8 md:px-24 py-10 md:py-12 w-full  bg-[var(--primaryDark)] min-h-screen flex-col text-white items-center justify-center' >
      <h1 className='font-bold text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-[var(--gradientBlue)] to-[var(--gradientPink)] md:text-5xl my-8 '>PROJECTS & WORKS</h1>
      <div className='flex  items-center justify-center'>
 
        <ul className="projectScroll overflow-y-scroll  max-h-[550px] md:max-h-[450px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-2" ref={ref}>


          {projects.map((item,index) => (
            <motion.li key={index} className='list-none' variants={cardVariants} initial='initial' whileInView="animate" transition={{duration:0.3, delay:index*0.2}}>
            <div className="group  relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl rounded-lg hover:shadow-black/30 transition-shadow" key={item.title}>
              <div className="h-52 w-80">
                <img className='h-full w-full object-cover group-hover:rotate-3 group-hover:scale-125 transition-transform duration-500' alt="" src={item.img}/>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via transparent to-black group-hover:from-[var(--gradientPinkDark)] group-hover:via-black/60 group-hover:to-[var(--gradientBlueDark)]"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[60%] group-hover:translate-y-0 transition-all">
                  <h1 className='text-lg font-medium text-gray-300'>{item.title}</h1>
                  <p className=" italic  mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-light text-gray-300">{item.description}.</p>
                  <ul className='flex gap-2'>
                    {item.techs.map((tech, techIndex) => (
                      <li className='rounded-full shadow shadow-black/60 bg-neutral-900 py-2 px-3  text-sm capitalize text-white' key={techIndex}>{tech}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
            </motion.li>
          ))}

          {/* rounded-full shadow shadow-black/60 bg-neutral-900 py-2 px-3  text-sm capitalize text-white */}
        </ul>
      </div>
    </div>
  )
}

export default Project
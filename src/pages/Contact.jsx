import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react'
import { FaWhatsapp, FaInstagram, FaLinkedin, FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import emailjs from '@emailjs/browser';



const textVariants = {
  initial: {
    x: -300,

  },
  animate: {
    x: 0,

    transition: {
      duration: 1,
      staggerChildren: 0.2,
    },
  },
}


const btnVariants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 2,
      staggerChildren: 0.4,
      delay: 2.5
    },
  },
}



const Contact = () => {
  const formRef = useRef();
  const [error,setError] = useState(false);
  const[success,setSuccess]=useState(false);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_iye52v8', 'template_1qujuvi', formRef.current, 'uB07QfFkag_8VHB3B')
      .then((result) => {
        setSuccess(true);
      }, (error) => {
        setError(true);
      });
  };
  return (
    <div className='z-40 px-8 md:px-24 py-10 md:py-12 w-full  bg-[var(--primaryDark)] min-h-screen flex flex-col  md:flex-row text-white items-center justify-center  md:justify-around'>
      <motion.div className="left w-full md:w-[40%] md:pr-14  flex flex-col justify-center items-center md:items-start md:gap-5"
        variants={textVariants} initial='initial' whileInView='animate'>
        <motion.h1 className='font-bold text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-[var(--gradientBlue)] to-[var(--gradientPink)] md:text-5xl  ' variants={textVariants}>LET'S CONNECT</motion.h1>
        <motion.p className='text-lg font-light text-gray-400  tracking-wider text-center md:text-start mt-5 md:mt-0' variants={textVariants}>Feel free to contact me for any inquiries or projects. I am always open to new opportunities. Lets build something awesome together!</motion.p>
        <motion.div className="socials flex mt-5 md:mt-10 w-full justify-between items-center" variants={btnVariants} initial='initial' whileInView='animate'>
          <motion.a href='https://wa.me/7824983530' target='_blank' variants={btnVariants}><FaWhatsapp className='h-5 w-5 hover:text-[#25D366] cursor-pointer' /></motion.a>
          <motion.a href='https://www.instagram.com/chandraj.cj/' target='_blank' variants={btnVariants}><FaInstagram className='h-5 w-5  hover:text-[#FE29AD] cursor-pointer' /></motion.a>
          <motion.a href='https://www.linkedin.com/in/chandraj-n-1a5937258/' target='_blank' variants={btnVariants}><FaLinkedin className='h-5 w-5 hover:text-[#0073B2] cursor-pointer' /></motion.a>
          <motion.a href='https://github.com/ChandrajCJ' target='_blank' variants={btnVariants}><FaGithub className='h-5 w-5 hover:text-[#24292F] cursor-pointer' /></motion.a>
        </motion.div>
      </motion.div>
      <div className="right mt-2 md:my-0 w-full md:w-[40%] ">
        <motion.form ref={formRef} onSubmit={sendEmail} action="" className='w-full flex flex-col gap-1' initial={{ opacity: -1, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 1.5 }} >
          <input className='z-30 mb-5 w-full h-10 bg-[#2D2D2F] outline-none border-b-2 border-slate-300 text-slate-200 p-3 rounded-md text-sm font-normal' type="name" name="name" id="name" placeholder="Name" />
          <input className='z-30 mb-5 w-full h-10 bg-[#2D2D2F]  outline-none border-b-2 border-slate-300 text-slate-200 px-3 rounded-md text-sm font-normal' type="email" name="email" id="mail" placeholder="Mail" />
          <textarea className='z-30 textArea mb-5 w-full resize-none h-28 bg-[#2D2D2F] outline-none  border-b-2  border-slate-300 text-slate-50 p-3 rounded-md text-sm font-normal' type="message" name="message" id="message" placeholder="Enter your message" />
          <input className='z-30 flex justify-center items-center gap-x-4  h-10 px-6 font-normal text-lg  rounded-md bg-gradient-to-r from-[var(--gradientBlue)] to-[var(--gradientPink)] hover:text-slate-300 text-white cursor-pointer' type="submit" />
          {error && "Error"}
          {success && "Message sent"}
        </motion.form>
      </div>
    </div>
  )
}

export default Contact
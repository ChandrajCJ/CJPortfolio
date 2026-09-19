import React from 'react'
import { motion } from 'framer-motion';

import GradientCircularProgressBar from './GradientCircularProgressBar';
const devData = [ 
    {
        "title": "HTML",
        "percentage": 90
    },
    {
        "title": "CSS",
        "percentage": 80
    },
    {
        "title": "JAVASCRIPT",
        "percentage": 75
    },
    {
        "title": "TAILWIND",
        "percentage": 90
    },
    {
        "title": "REACT JS",
        "percentage": 75
    },
    {
        "title": "MYSQL",
        "percentage": 80
    },
    {
        "title": "PHP",
        "percentage": 80
    },
    {
        "title": "NODE JS",
        "percentage": 70
    },
];


const langData = [
    {
        "title": "C/C++",
        "percentage": 80
    },
    {
        "title": "PYTHON",
        "percentage": 70
    },
    {
        "title": "JAVA",
        "percentage": 65
    },
    {
        "title": "JAVASCRIPT",
        "percentage": 75
    },
    {
        "title": "PHP",
        "percentage": 80
    },

];

const gradientColors = ['var(--gradientPink)', 'var(--gradientBlue)']; // Example gradient colors

const ProgressBars = () => {
    return (
        <div className=" flex flex-col">
            <h1 className=' font-normal text-2xl my-5'>Development:</h1>
            <div className="flex flex-wrap justify-between gap-5 mb-7" >
                {devData.map(item => (
                    <div className='w-[45%]' key={item.title}>
                        <div className='flex flex-col'>
                            <div className='flex justify-between'>
                                <h2 className='text-sm font-medium text-gray-300'>{item.title}</h2>
                                <h2 className='text-sm font-medium text-gray-300'>{item.percentage}%</h2>
                            </div>
                            <div className="h-2 bg-[#] rounded-md w-[100%]">
                                <motion.div className=" bg-gradient-to-r from-[var(--gradientBlue)] to-[var(--gradientPink)] rounded-md  h-full  "
                                    style={{ width: `${item.percentage}%` }} 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${item.percentage}%` }}
                                    transition={{ duration: 2 }}
                                    >
                                    </motion.div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <h1 className=' font-normal text-2xl my-5'>Programming Languages:</h1>
            <div className="flex flex-wrap justify-around md:justify-between gap-5 ">
                {langData.map(item1 => (
                    <div className="flex flex-col justify-center items-center" key={item1.title}>
                        <GradientCircularProgressBar percentage={item1.percentage} gradientColors={gradientColors} />
                        <h2 className='text-sm font-medium text-gray-300'>{item1.title}</h2>
                    </div>
                ))}
            </div>

        </div>

    )
}

export default ProgressBars

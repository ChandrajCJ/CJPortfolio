import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { IoBookSharp } from "react-icons/io5";
import { GiGraduateCap } from "react-icons/gi";


const eduDetails = [
    {
        "title": "Under Graduate",
        "institute": "Sri Manakula Vinayagar Engineering College",
        "location": "Puducherry, Pondicherry, India",
        "date": "2021-present"
    },
    {
        "title": "High School",
        "institute": "Kendriya Vidyalaya No.2",
        "location": "Puducherry, Pondicherry, India",
        "date": "2019-2021"
    },
    {
        "title": "Schooling",
        "institute": "Kendriya Vidyalaya No.2",
        "location": "Puducherry, Pondicherry, India",
        "date": "2007-2019"
    },
];



const EducationLine = () => {
    return (
        <div className='text-sm  z-0 relative'>
            <VerticalTimeline>
                {eduDetails.map(item => (
                    <VerticalTimelineElement
                        key={item.title}
                        className=""
                        contentStyle={{ background: "var(--gradientPink)", color: "#fff" }}
                        contentArrowStyle={{ borderRight: "7px solid  var(--gradientPink)" }}
                        date={item.date}
                        iconStyle={{ background: "var(--gradientBlue)", color: "#fff" }}
                        icon={item.title==="Schooling"||item.title==="High School"? <IoBookSharp />
                        : <GiGraduateCap />
                    }
                    >
                        <h1 className="font-medium text-xl text-white">{item.title}</h1>
                        <h4 className="text-sm font-medium text-gray-300">{item.institute}</h4>
                        <h4 className="text-sm font-medium text-gray-300">
                            {item.location}
                        </h4>
                    </VerticalTimelineElement>

                ))}
            </VerticalTimeline>


        </div>
    )
}

export default EducationLine
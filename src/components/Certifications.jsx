import React from 'react'

const certification = [
    {
        "title": "Front-End Web Development",
    },
    {
        "title": "Cisco Certified Network Associate",
    },
    // {
    //     "title": "Azure DevOps",
    // },
    {
        "title": "MongoDB Database Administrator",
    },
    // {
    //     "title": "Amazon Web Services",
    // },

];
const Certifications = () => {
    return (
        <div>
            <ol className="max-w-md px-4 py-8 space-y-4 text-sm md:text-lg font-medium text-gray-300 list-disc list-inside">
                {certification.map(item => (
                    <li key={item.title}>
                        {item.title}
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default Certifications
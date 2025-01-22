import React from 'react'
import { useMyQuery } from './assets/utils/query'
import { Link } from 'react-router-dom';

const Projects = (): React.JSX.Element => {
    type ProjectRResponse = {
        id: string; title: string; image: string; lDescription: string; category: string;
    }[];
    const projects = useMyQuery<ProjectRResponse>("/projects", "projects");
    return (
        <div>
            {projects.data?.map((project, index) => (
                <div key={index} className=' w-96 rounded-md overflow-hidden shadow-md'>
                    <div>
                        <picture><img src={project.image} alt={project.title} /></picture>
                    </div>
                    <div className="details py-3 px-4 h-52 max-phone:h-60">
                        <h6 className='text-xl font-montserrat font-semibold'>{project?.title}</h6>
                        <p className='text-base  pt-2'>{project?.lDescription}</p>
                        <Link to={`/projects/${project?.id}`} className='btn px-6 inline-block py-2 mt-3 text-base'>View Details</Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Projects
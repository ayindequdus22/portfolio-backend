import React from 'react'
import { useMyQuery } from '../utils/query'
import { Link } from 'react-router-dom';
const Projects = (): React.JSX.Element => {
    type ProjectRResponse = {
        id: string; title: string; image: string; ldescription: string; category: string;
    }[];
    const projects = useMyQuery<ProjectRResponse>("/projects", "projects");
  
    
    return (
        <main className='p-2'>
            <h6 className='text-center py-3 text-primary font-semibold text-2xl'> All Projects</h6>
            <div className='p-2 dfAc flex-wrap gap-x-4 gap-y-8'>
                {projects.data?.map((project, index) => (
                    <div key={index} className='w-96 rounded-md overflow-hidden shadow-[0_0_2px_rgba(225,225,225,1)]'>
                        <div>
                            <picture><img src={project.image} alt={project.title} /></picture>
                        </div>
                        <div className="details py-3 px-4 h-52 max-phone:h-60">
                            <h6 className='text-xl font-montserrat font-semibold'>{project?.title}</h6>
                            <p className='text-base  pt-2'>{project?.ldescription}</p>
                            <Link to={`/admin/projects/${project?.id}`} className='btn px-6 inline-block py-2 mt-3 text-base bg-primary'>View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Projects
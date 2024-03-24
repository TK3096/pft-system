'use client'

import { usePortfolio } from '@/hooks/usePortfolio'
import { ProjectListItem } from './ProjectListItem'

export const ProjectList = () => {
  const { data } = usePortfolio()

  return (
    <div className='grid grid-cols-3 gap-3 p-3'>
      {data.map((project) => (
        <div key={project.id}>
          <ProjectListItem
            name={project.name}
            readmeUrl={project.readmeUrl}
            rank={project.rank}
            src={project.src}
            demo={project.demo}
          />
        </div>
      ))}
    </div>
  )
}

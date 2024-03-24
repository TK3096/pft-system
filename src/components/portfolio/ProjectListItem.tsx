import { PortfolioRank } from '@/types'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from '@/components/ui/drawer'

import { ProjectCard } from '@/components/portfolio/ProjectCard'

interface ProjectListItemProps {
  name: string
  readmeUrl: string
  rank: PortfolioRank
  src: string
  demo?: string
}

export const ProjectListItem = (props: ProjectListItemProps) => {
  const { name, rank, readmeUrl, src, demo } = props

  return (
    <Drawer>
      <DrawerTrigger className='w-full'>
        <ProjectCard name={name} rank={rank} />
      </DrawerTrigger>
      <DrawerContent>
        <div className='w-full px-6 py-3'>
          <DrawerHeader>
            <DrawerTitle className='text-2xl'>{name}</DrawerTitle>
            <DrawerDescription>
              <div className='flex gap-3'>
                <a
                  href={src}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-neutral-500 hover:text-primary capitalize'
                >
                  Repository
                </a>
                {demo && (
                  <a
                    href={demo}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-sm text-neutral-500 hover:text-primary capitalize'
                  >
                    Demo
                  </a>
                )}
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <div className='p-5'>
            <div className='overflow-y-scroll h-[50vh]'>
              <p className='text-5xl'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
                atque magnam facere. Distinctio quod adipisci cumque fugit
                repudiandae? Aut labore repudiandae quas nulla numquam eos ex
                aperiam dicta sint assumenda?
              </p>
              <p className='text-5xl'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
                atque magnam facere. Distinctio quod adipisci cumque fugit
                repudiandae? Aut labore repudiandae quas nulla numquam eos ex
                aperiam dicta sint assumenda?
              </p>
              <p className='text-5xl'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
                atque magnam facere. Distinctio quod adipisci cumque fugit
                repudiandae? Aut labore repudiandae quas nulla numquam eos ex
                aperiam dicta sint assumenda?
              </p>
              <p className='text-5xl'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
                atque magnam facere. Distinctio quod adipisci cumque fugit
                repudiandae? Aut labore repudiandae quas nulla numquam eos ex
                aperiam dicta sint assumenda?
              </p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

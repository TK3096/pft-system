import { PortfolioRank } from '@/types'

import { Octokit } from 'octokit'
import { MDXRemote } from 'next-mdx-remote/rsc'
import dayjs from 'dayjs'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from '@/components/ui/drawer'

import { PortfolioCard } from '@/components/portfolio/PortfolioCard'

interface PortfolioListItemProps {
  name: string
  owner: string
  repo: string
  demo: string
  rank: PortfolioRank
  src: string
  createdAt: number
}

export const PortfolioListItem = async (props: PortfolioListItemProps) => {
  const { name, owner, repo, demo, rank, src, createdAt } = props

  const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  })

  const res = await octokit.request(
    `GET /repos/${owner}/${repo}/contents/README.md`,
    {
      mediaType: {
        format: 'raw',
      },
    },
  )

  const markdown = res.data.toString()

  const date = dayjs.unix(createdAt).format('DD/MM/YYYY')

  return (
    <Drawer>
      <DrawerTrigger className='w-full'>
        <PortfolioCard name={name} rank={rank} />
      </DrawerTrigger>
      <DrawerContent>
        <div className='w-full px-6 py-3'>
          <DrawerHeader>
            <DrawerTitle className='text-2xl'>{name}</DrawerTitle>
            <DrawerDescription asChild>
              <div className='flex gap-3'>
                <p>Created {date}</p>
                <a
                  href={src}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm hover:text-primary capitalize underline text-blue-600 transition-colors duration-300'
                >
                  Repository
                </a>
                {demo && (
                  <a
                    href={demo}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-sm hover:text-primary capitalize underline text-blue-600 transition-colors duration-300'
                  >
                    Demo
                  </a>
                )}
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <div className='p-5'>
            <div className='overflow-y-scroll h-[50vh] bg-neutral-900 rounded-md px-5 py-3 mdx-wrapper'>
              <MDXRemote source={markdown} />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

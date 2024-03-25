import { Portfolio } from '@/types'

import dayjs from 'dayjs'
import { Octokit } from 'octokit'
import { MDXRemote } from 'next-mdx-remote/rsc'

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
  portfolio: Portfolio
}

export const PortfolioListItem = async (props: PortfolioListItemProps) => {
  const { portfolio } = props

  const { name, owner, repo, demo, rank, src, createdAt } = portfolio

  const date = dayjs.unix(createdAt).format('DD/MM/YYYY')

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

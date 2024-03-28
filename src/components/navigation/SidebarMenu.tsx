'use client'

import { RouteType } from '@/types'

import { useRouter, usePathname } from 'next/navigation'

import { LayoutList } from 'lucide-react'

import { SidebarItem } from '@/components/navigation/SidebarItem'

const MENUS = [
  {
    title: 'Tasks Management',
    path: '/tasks-management',
    Icon: LayoutList,
    type: 'private',
  },
]

interface SidebarMenuProps {
  type: RouteType
}

export const SidebarMenu = (props: SidebarMenuProps) => {
  const { type } = props

  const router = useRouter()
  const pathname = usePathname()

  const handleClickItem = (path: string) => {
    router.push(path)
  }

  const menus = MENUS.filter((menu) => menu.type === type)

  return (
    <div className='w-full flex flex-1 flex-col items-center gap-y-3 overflow-y-scroll no-scrollbar'>
      {menus.map((menu) => (
        <div key={menu.title}>
          <SidebarItem
            label={menu.title}
            Icon={menu.Icon}
            onClick={() => handleClickItem(menu.path)}
            active={pathname === menu.path}
          />
        </div>
      ))}
    </div>
  )
}

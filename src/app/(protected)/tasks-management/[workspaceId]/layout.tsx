import { Sidebar } from '@/components/tasks-management/navigation/Sidebar'

import { get } from '@/lib/firebase-sdk/db'
import { WORKSPACES_COLLECTION } from '@/lib/constant'

const WorkspaceIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { workspaceId: string }
}) => {
  const workspace = await get(WORKSPACES_COLLECTION, params.workspaceId)

  if (!workspace || !workspace.data()) {
    return (
      <div className='text-center h-full flex justify-center items-center'>
        <p className='font-semibold text-2xl'>Workspace not found</p>
      </div>
    )
  }

  return (
    <div className='h-full'>
      <div className='fixed inset-y-0 z-40 h-full w-[200px]'>
        <Sidebar
          type='board'
          headerLabel={workspace.data()?.name}
          headerHref={`/tasks-management/${params.workspaceId}`}
          addButtonLabel='new board'
        />
      </div>
      <main className='pl-[200px] h-full'>{children}</main>
    </div>
  )
}

export default WorkspaceIdLayout

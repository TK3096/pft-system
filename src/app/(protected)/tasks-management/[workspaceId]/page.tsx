'use client'

import { useParams } from 'next/navigation'

const WorkspaceIdPage = () => {
  const params = useParams()

  return (
    <div>
      <div>workspace {params.workspaceId}</div>
    </div>
  )
}

export default WorkspaceIdPage

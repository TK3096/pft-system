'use client'

import { useRouter } from 'next/navigation'

import { logout } from '@/actions/logout'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

const TasksManagementPage = () => {
  const router = useRouter()

  const handleLogout = () => {
    logout()
      .then((res) => {
        if (res.error) {
          console.log(res.error)
          return
        }

        router.push('/')
      })
      .catch((e) => console.error(e))
  }

  return (
    <div>
      <div>task management page</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default TasksManagementPage

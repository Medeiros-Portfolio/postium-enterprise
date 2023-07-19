import { MetaTags } from '@redwoodjs/web'

import UserCell from 'src/components/UserCell'

import { useAuth } from '../../auth'

const ProfilePage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="Profile" description="Profile page" />
      <UserCell id={currentUser.id}></UserCell>
    </>
  )
}

export default ProfilePage

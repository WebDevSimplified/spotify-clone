import { useContext } from 'react'
import Logout from './Logout'
import LoginPremium from './LoginPremium'
import { AuthContext } from '../../context/AuthContext'

export default function Home() {
  const { auth } = useContext(AuthContext)

  return (
    <div>
      {auth? <Logout />: <LoginPremium /> }
    </div>
  )
}

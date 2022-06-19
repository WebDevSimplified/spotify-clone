import { useContext } from 'react'
import Logout from './Logout'
import LoginPremium from './LoginPremium'
import { AuthContext } from '../../context/AuthContext'
import VietnamTab from '../VietnamTab/VnChildrenTab'

export default function Home() {
  const { auth } = useContext(AuthContext)

  return (
    <div>
      {auth? <Logout />: <LoginPremium /> }
    </div>
  )
}

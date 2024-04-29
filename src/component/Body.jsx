
// import Feed from '../component/Feed'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'


const Body = () => {
  return (
    <div className='flex'>
    <Sidebar/>
     <Outlet/>
   </div>
  )
}

export default Body
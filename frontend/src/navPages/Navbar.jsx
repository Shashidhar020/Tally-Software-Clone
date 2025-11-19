import React,{useState} from 'react'
import Menu from '../assets/menu.png'
import GateWay from '../pages/GateWay'
import { useSelector,useDispatch } from 'react-redux'
import { setShow} from '../redux/dashboardSlice'

const Navbar = () => {
const dispatch = useDispatch()
  const{show} = useSelector(state=>state.dashboard)
  return (
    <>
    <div className='dropdown'>
      <div onClick={()=>dispatch(setShow(!show))} >
         <h2 className='dropdown-menu' >Menu</h2> 
         
          </div>
        {show  &&
        <GateWay onClose={()=>setShow(false)}/>
        }
     

    </div>
    
    </>
  )
}

export default Navbar
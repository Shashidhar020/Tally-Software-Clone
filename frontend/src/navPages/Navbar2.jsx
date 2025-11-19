
import GateWay2 from '../pages/GateWay2'
import { useSelector,useDispatch } from 'react-redux'
import { setShow} from '../redux/dashboardSlice'

const Navbar2= () => {
const dispatch = useDispatch()
  const{show} = useSelector(state=>state.dashboard)
  return (
    <>
    <div className='dropdown2'>
      <div onClick={()=>dispatch(setShow(!show))} >
         <h2 className='dropdown-menu2' >Menu</h2> 
         
          </div>
        {show  &&
        <GateWay2 onClose={()=>setShow(false)}/>
        }
     

    </div>
    
    </>
  )
}

export default Navbar2
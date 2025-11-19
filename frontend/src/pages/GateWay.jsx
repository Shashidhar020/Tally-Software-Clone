import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { setShowMaster,setShowOthers,setShowTransaction } from '../redux/dashboardSlice'
import { IoIosMenu } from "react-icons/io";
const GateWay = ({onClose}) => {
  const dispatch = useDispatch()
  const{showMaster,showTransaction,showOthers} = useSelector(state=>state.dashboard)
  const navigate = useNavigate()
  return (
    <>
    <div className='home1'>
        <div  className='gw mt'>
            <div className='mt mas'>
            <div>
            <h4 style={{color:"#ff7605ff",cursor:"pointer"}}   onClick={()=>dispatch(setShowMaster(!showMaster))}>Masters</h4>
            {showMaster && 
            <div className='div-master '>
            <h4 className=' el'  onClick={()=>navigate("/group")}> Group</h4>        
            <h4 className='el' onClick={()=>navigate("/stockItem")}>StockItem</h4>
            <h4  className=' el'   onClick={()=>navigate("/LedgerList")}>Ledgers</h4>
             <h4  className=' el' onClick={()=>navigate("/stockGroup")} >Stock Group</h4>
            </div>
            }
            </div>
          
             </div>
             <div className='ts'>
           <div>
          <h4  className ="ts " style={{color:"#60c1ebff",cursor:"pointer"}} onClick={()=>dispatch(setShowTransaction(!showTransaction))}>Transaction</h4>
               { showTransaction &&
                <div>
                  <h4 className ="ts el te" onClick={()=>navigate("/sales")}>Sales</h4>
                  <h4  className ="ts el te">Day Book</h4>
                 </div>
               }
               <h4 className ="ts  " style={{color:"#7560ebff",cursor:"pointer"}} onClick={()=>dispatch(setShowOthers(!showOthers))}>Others</h4>
               {
                showOthers&&
                <div>
                  <h4 className='ts el te' onClick={()=>navigate('/dashboard')}>DashBoard</h4>
                   <h4 className='ts el te' onClick={()=>navigate('/home')}>Home</h4>
                    <h4 className='ts el te' onClick={()=>navigate('/create')}>Create</h4>
                     <h4 className='ts el te' onClick={()=>navigate('/alter')}>Alter</h4>
                       <h4 className='ts el te' onClick={()=>navigate('/dashboard2')}>DashBoard2</h4>
                </div>
               }
                </div>
             </div>
              </div> 
    </div>
    
    </>
  )
}

export default GateWay
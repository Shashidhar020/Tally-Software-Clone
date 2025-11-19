import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { FaPlusCircle } from "react-icons/fa";
import { FiMinusCircle } from "react-icons/fi";
import { setShowMaster,setShowOthers,setShowTransaction } from '../redux/dashboardSlice'
import { IoIosMenu } from "react-icons/io";
const GateWay2 = ({onClose}) => {
  const dispatch = useDispatch()
  const{showMaster,showTransaction,showOthers} = useSelector(state=>state.dashboard)
  const navigate = useNavigate()
  return (
    <>
    <div className='gateway2'>
        <div  className='gw-d2 mt-2'>
            <div className='mt-2 mas2'>
            <div>
           <p className="entity"><span style={{color:"#ffd500ff",cursor:"pointer"}}>Masters</span><span className='plus' onClick={()=>dispatch(setShowMaster(!showMaster))}>{showMaster?<FiMinusCircle />:<FaPlusCircle />}</span></p>
            {showMaster && 
            <div className='div-master2 '>
            <h4 className=' el2'  onClick={()=>navigate("/group")}> Group</h4>        
            <h4 className='el2' onClick={()=>navigate("/stockItem")}>StockItem</h4>
            <h4  className=' el2'   onClick={()=>navigate("/LedgerList")}>Ledgers</h4>
             <h4  className=' el2' onClick={()=>navigate("/stockGroup")} >Stock Group</h4>
            </div>
            }
            </div>
          
             </div>
             <div className='ts2'>
           <div>
          <p className="entity"><span style={{color:"#ffd500ff",cursor:"pointer"}}>Transaction</span><span className='plus' onClick={()=>dispatch(setShowTransaction(!showTransaction))}>{showTransaction?<FiMinusCircle />:<FaPlusCircle />}</span></p>
               { showTransaction &&
                <div>
                  <h4 className ="ts2 el2 te2" onClick={()=>navigate("/sales")}>Sales</h4>
                  <h4  className ="ts2 el2 te2">Day Book</h4>
                 </div>
               }
               <p className="entity"> <span className ="ts2  " style={{color:"#ffd500ff",cursor:"pointer"}} >Others</span><span className='plus' onClick={()=>dispatch(setShowOthers(!showOthers))}>{showOthers?<FiMinusCircle />:<FaPlusCircle />}</span></p>
               {
                showOthers&&
                <div>
                  <h4 className='ts2 el2 te2' onClick={()=>navigate('/dashboard')}>DashBoard</h4>
                   <h4 className='ts2 el2 te2' onClick={()=>navigate('/home')}>Home</h4>
                    <h4 className='ts2 el2 te2' onClick={()=>navigate('/create')}>Create</h4>
                     <h4 className='ts2 el2 te2' onClick={()=>navigate('/alter')}>Alter</h4>
                     <h4 className='ts2 el2 te2' onClick={()=>navigate('/dashboard2')}>DashBoard2</h4>
                </div>
               }
                </div>
             </div>
              </div> 
    </div>
    </>
  )
}

export default GateWay2
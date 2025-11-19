import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setShowMenu } from "../redux/dashboardSlice";
import Menu from '../assets/menu.png'
import Navbar from '../navPages/Navbar';
import { IoIosMenu } from "react-icons/io";
const Create = () => {
   const{showMenu} = useSelector(state => state.dashboard)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    
    <div>

    <div style={{marginTop:"20px",marginLeft:showMenu?"25%":"0%"}} >
      <div className='home' >
        <h1 style={{textAlign:"center"}}>Tally Software</h1>
    </div>
    <div className="home-container">
        <div className='gate-way'>
            <h3>List of Masters</h3>
        </div>
        <div className='master'>
            <h4 style={{color:"#60c1ebff"}}>Accounting Masters</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'} onClick={()=>navigate("/group/new")}>Group</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'} onClick={()=>navigate("/ledgers/new")}>Ledger</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'}>Currency</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'}>Voucher Type</h4>
             <h4 style={{color:"#60c1ebff"}}>Inventory Masters</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'} onClick={()=>navigate('/stockGroup/new')}>Stock Group</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'} onClick={()=>navigate('/stockItem/new')}>Stock Item</h4>
        </div>
         
    </div>
    </div>
    
     <div className={showMenu?"hamburger-menu":"not-hamburger-menu"} onClick={()=>dispatch(setShowMenu(!showMenu))} >
       <span className='menu-icon'><IoIosMenu /></span> </div> 
      <div>
        {showMenu  &&
        <Navbar/>
        }
      </div>
    </div>
    
  )
}

export default Create
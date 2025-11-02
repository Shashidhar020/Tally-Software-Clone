import React from 'react'
import { useNavigate } from 'react-router-dom'
const Alter = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className='home'>
        <h1 style={{textAlign:"center"}}>Tally Software</h1>
    </div>
    <div className="home-container">
        <div className='gate-way'>
            <h3>List of Masters</h3>
        </div>
        <div className='master'>
            <h4 style={{color:"#60c1ebff"}}>Accounting Masters</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'} onClick={()=>navigate("/group")}>Group</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'} onClick={()=>navigate("/")}>Ledger</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'}>Currency</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'}>Voucher Type</h4>
             <h4 style={{color:"#60c1ebff"}}>Inventory Masters</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'} onClick={()=>navigate("/stockGroup")}>Stock Group</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'} onClick={()=>navigate("/stockItem")}>Stock Item</h4>
        </div>
        
    </div>
    </>
  )
}

export default Alter
import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className='home'>
        <h1 style={{textAlign:"center"}}>Tally Software</h1>
    </div>
    <div className="home-container">
        <div className='gate-way'>
            <h3>Gate way of Tally</h3>
        </div>
        <div className='master'>
            <h4 style={{color:"#60c1ebff"}}>Masters</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'} onClick={()=>navigate("/create")}>Create</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'} onClick={()=>navigate("/alter")}>Alter</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'}>Chart Accounts</h4>
             <h4 style={{color:"#60c1ebff"}}>Transaction</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'} onClick={()=>navigate("/sales")}>Vouchers</h4>
            <h4 onMouseOver={(e)=>e.target.style.backgroundColor = '#ffe100ff'} onMouseOut={(e)=>e.target.style.backgroundColor = 'transparent'}>Day Book</h4>
        </div>
        
    </div>
    </>
  )
}

export default Home
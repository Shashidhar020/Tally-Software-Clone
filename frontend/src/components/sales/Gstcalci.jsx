import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
const Gstcalci = () => {
    const navigate = useNavigate()
 const { search } = useLocation();
  const params = new URLSearchParams(search);
  const key = params.get("key");
  const index = params.get("index")
  return (
    <>
    <div style={{ marginTop:"4%"}}>
        <div>
            GST Calucaltion
        </div>
        <div>
             <span>Enter the CGST</span>
        </div>
        <div>
   <span>{index}</span>
        </div>
     <div>
<span onClick={()=>navigate(`/sales/${key}`)}>GST</span>
     </div>
        

    </div>
    </>
  )
}

export default Gstcalci
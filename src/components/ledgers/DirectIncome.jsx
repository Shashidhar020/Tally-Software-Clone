import React, { useState } from 'react'

import { useEffect } from 'react'
import List_of_groups from '../../dialogues/List_of_groups'
const DirectIncome = ({items,setItems}) => {
    const[ledger,setLedger] = useState("Discount")
    const[dialogue,setDialogType] = useState()
    const[rounding,setRounding] = useState("Not Applicable")
     const[limit,setLimit] = useState(1)
     const[taxtype,setTaxType ]= useState("Not Applicable")
      const[option,setOption ]= useState("Goods")
      const[method,setMethod] = useState("Based on Quality")
      const[gst,setGst ] = useState("Not Applicable")
     const[action,setAction] = useState("As per Company/Group")
     const[hsn,setHsn] = useState("")
     const[description,setDescription] = useState("")
     const[classification,setClassification] = useState("")
     const[GstAction,setGstAction] = useState("As per Company/Group")
     const[gstClassification,setgstClassification] = useState("")
     const[supply,setSupply] = useState("Services")
     
    useEffect(()=>{
      const ledgerItem = items.find(i=>i.type=="Ledger")
       if(ledgerItem) setLedger(ledgerItem.value)
      const roundingState = items.find((i)=>i.type=="Rounding Methods")
     if(roundingState) setRounding(roundingState.value)
      const limitState = items.find(i=>i.type=="Rounding Limit")
     if(limitState) setLimit(limitState.value)
      const taxTypeState = items.find(i=>i.type=="Tax Type")
     if(taxTypeState) setTaxType(taxTypeState.value)
      const optionState = items.find(i=>i.type=="option")
     if(optionState) setOption(optionState.value)
      const methodState = items.find(i=>i.type=="method")
     if(methodState) setMethod(methodState.value)
      const gstState = items.find(i=>i.type=="gst")
     if(gstState) setGst(gstState.value)
      const actionState = items.find(i=>i.type=="action")
     if(actionState) setAction(actionState.value)
      const gstActionState = items.find(i=>i.type=="gstaction")
     if(gstActionState) setGstAction(gstActionState.value)
      const supplyState = items.find(i=>i.type=="supply")
     if(supplyState) setSupply(supplyState.value)
    }, [items])
    
    
     const handleSelect=(type, value)=>{
       if(type == "Ledger") setLedger(value)
       if(type == "Rounding Methods") setRounding(value)
        if( type== "Tax Type") setTaxType(value)
       if( type ==="option") setOption(value)
       if(type==="method") setMethod(value)
        if( type==="gst") setGst(value)
        if(type == "action") setAction(value)
        if(type == "gstaction") setGstAction(value)
        if(type === "supply") setSupply(value)
      setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.type === type);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].value = value;
        return updated;
      }
      return [...prev, { type, value }];
    });
    setDialogType(null)
    }
  return (
    <div>
    <div style={{width:"400px",height:"100px"}} >
        <p onClick={()=>setDialogType("Ledger")} className="under-div" tabIndex={0}><span>Type of Ledger</span><span style={{marginLeft:"146px"}}><b>:{ledger}</b></span></p>
        {ledger == "Invoice Rounding" &&
        <div>
        <p onClick={() => setDialogType("Rounding Methods")} className="under-div"   tabIndex={0}><span >Rounding Method</span><span style={{marginLeft:"129px"}} ><b>:{rounding}</b></span></p>
        <p style={{marginLeft:"13px",marginTop:"-13px"}}><span>Rounding Limit</span><span style={{marginLeft:"128px"}}><b>:</b><input type="text" value={limit} onChange={(e)=>{
          const value=e.target.value
          setLimit(value)
          handleSelect("Rounding Limit", value)
          }} style={{width:"50px",border:"none",fontWeight:"bold"}}/></span></p>
      </div>
        }
        
    </div>
    
    {ledger == "Not Applicable" ?  <div>
    <div>
        <p><span><u><b>Statutory Details</b></u></span></p>
    </div>
    <div>
      <p onClick={()=>setDialogType("Tax Type")}  className="under-div" tabIndex={0}><span>Include in Assessable value Calculation</span><span style={{marginLeft:"5px"}}><b>:{taxtype}</b></span></p>
  
    </div>
     { taxtype === "GST" ?
    <div style={{marginLeft:"20px"}}>
     <div onClick={()=>setDialogType("options")}>
    <p  className="under-div" tabIndex={0}  style={{marginTop:"-13px"}}><span>Appropriate to &nbsp;</span><span style={{marginLeft:"119px"}}><b>:{option}</b></span></p>
    </div>
    <div onClick={()=>setDialogType("calu method")}>
      <p  className="under-div" tabIndex={0}  style={{marginTop:"-13px"}}><span>Method of calucalation&nbsp;&nbsp;</span><span style={{marginLeft:"70px"}}><b>:{method}</b></span></p>
    </div>
    </div>:<div></div>
    }
    <div >
      <p onClick={()=>setDialogType("gst")}  className="under-div" tabIndex={0}  style={{}}><span>Gst Applicability</span><span style={{marginLeft:"131px"}}><b>:{gst}</b></span></p>
      </div>
      {gst == "Applicable" &&
      <div>
        <div>
        <div>
         <p><span><u><b>HSN/SAC Related Details</b></u></span></p>
         <p onClick={()=>setDialogType("action")} style={{marginTop:"-13px"}}  className="under-div" tabIndex={0} ><span>HSN/SAC Details</span><span style={{marginLeft:"122px"}}><b>:{action}</b></span></p>
        {action === "As per Company/Group" && 
        <div style={{opacity:"50%",display:"inline",  gap: "3px"}}>
          <p style={{marginTop:"-13px"}}><span>Source of details</span><span style={{marginLeft:"131px"}}>:Not Available</span></p>
          <p  style={{marginTop:"-13px"}}><span>HSN/SAC</span><span style={{marginLeft:"166px"}}>:</span></p>
          <p  style={{marginTop:"-13px"}}><span>Description</span><span style={{marginLeft:"160px"}}>:</span></p>
          </div>
        }
        {action === "Specify Details Here" &&
        <div>
          <p  style={{marginTop:"-13px"}}><span>HSN/SAC</span><span style={{marginLeft:"164px"}}>:<input type="text" value={hsn} onChange={(e)=>setHsn(e.target.value)} style={{border:"none"}}/></span></p>
          <p  style={{marginTop:"-13px"}}><span>Description</span><span style={{marginLeft:"157px"}}>:<input type="text" value ={description} onChange={(e)=>setDescription(e.target.value)} style={{border:"none"}}/></span></p>
        </div>
        }
         {action === "Use GST Classification" && 
        <div style={{display:"inline",  gap: "3px"}}>
          <p  style={{marginTop:"-13px"}}><span>Classification</span><span style={{marginLeft:"148px"}}>:<input type="text" value={classification} onChange={(e)=>setClassification(e.target.value) } style={{border:"none"}}/></span></p>
          <p  style={{marginTop:"-13px",opacity:"50%"}}><span>HSN/SAC</span><span style={{marginLeft:"166px"}}>:</span></p>
          <p  style={{marginTop:"-13px",opacity:"50%"}}><span>Description</span><span style={{marginLeft:"160px"}}>:</span></p>
          </div>
        }
          </div>
        </div>
        <div>
         <p><u><b>GST Rate Details</b></u></p>
         <p onClick={()=>setDialogType("gstaction")} style={{marginTop:"-13px"}}  className="under-div" tabIndex={0} ><span>GST Rate Details</span><span style={{marginLeft:"124px"}}><b>:{GstAction}</b></span></p>
          {GstAction === "As per Company/Group"
          &&
          <div style={{opacity:"50%"}} >
            <p style={{marginTop:"-13px"}}><span>Source of Details</span><span style={{marginLeft:"125px"}}><b>:Not Available</b></span></p>
            <p style={{marginTop:"-13px"}}><span>Taxability type</span><span style={{marginLeft:"138px"}}><b>:0%</b></span></p>
            <p style={{marginTop:"-13px"}}><span>IGST Rate</span><span style={{marginLeft:"162px"}}><b>:0%</b></span></p>
            <p style={{marginTop:"-13px"}}><span>CGST Rate</span><span style={{marginLeft:"157px"}}><b>:0%</b></span></p>
            <p style={{marginTop:"-13px"}}><span>SGST/UTGST Rate</span><span style={{marginLeft:"110px"}}><b>:0%</b></span></p>
          </div>
          
          }

          {GstAction === "Use GST Classification"
          &&
          <div>
            
            <p style={{marginTop:"-13px"}}><span>Classification</span><span style={{marginLeft:"144px"}}><b>:<input type="text" value={gstClassification} onChange={(e)=>setgstClassification(e.target.value)}/></b></span></p>
            <p style={{marginTop:"-13px"}}><span>Taxability type</span><span style={{marginLeft:"136px"}}><b>:0%</b></span></p>
            <p style={{marginTop:"-13px"}}><span>IGST Rate</span><span style={{marginLeft:"160px"}}><b>:0%</b></span></p>
            <p style={{marginTop:"-13px"}}><span>CGST Rate</span><span style={{marginLeft:"155px"}}><b>:0%</b></span></p>
            <p style={{marginTop:"-13px"}}><span>SGST/UTGST Rate</span><span style={{marginLeft:"107px"}}><b>:0%</b></span></p>
    
            
          </div>
          
          }

          {
           GstAction === "Specify Details Here" &&
           <div>
            <p style={{marginTop:"-13px"}}><span>Taxability type</span><span style={{marginLeft:"138px"}}><b>:Exempt</b></span></p>
            <p style={{marginTop:"-13px",opacity:"50%"}}><span>IGST Rate</span><span style={{marginLeft:"162px"}}><b>:0%</b></span></p>
            <p style={{marginTop:"-13px",opacity:"50%"}}><span>CGST Rate</span><span style={{marginLeft:"157px"}}><b>:0%</b></span></p>
            <p style={{marginTop:"-13px",opacity:"50%"}}><span>SGST/UTGST Rate</span><span style={{marginLeft:"109px"}}><b>:0%</b></span></p>
           </div>
          }
          </div>
          <div>
            <p onClick={()=>setDialogType("supply")} style={{marginTop:"-13px"}}  className="under-div" tabIndex={0}><span>Type of Supply</span><span style={{marginLeft:"135px"}}><b>:{supply}</b></span></p>
          </div>
      </div>
       
      }
    </div>:<div>
    <div>
        <p><span><u><b>Statutory Details</b></u></span></p>
    </div>
    <div>
      <p ><span>Include in Assessable value Calculation</span><span style={{marginLeft:"5px"}}><b>:Not Applicable</b></span></p>
    </div>
     <div>
      <p><span>GST applicability</span><span style={{marginLeft:"127px"}}><b>:Not Applicable</b></span></p>
      </div>
    </div>}
   
   {dialogue == "Ledger" &&
    <List_of_groups
     title="Type of Ledger"
          items={["Not Applicable","Discount","Invoice Rounding"]}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("Ledger", value)}
          variant="dropdown"/>
   }
 {dialogue == "Rounding Methods" &&
    <List_of_groups
     title="Rounding Methods"
          items={["Downward Rounding","Normal Rounding","Upward Rounding"]}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("Rounding Methods", value)}
          variant="dropdown"/>
   }
   {dialogue === "Tax Type" &&

    <List_of_groups
     title="Duty / Tax Type"
          items={["Not Applicable","GST"]}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("Tax Type", value)}
          variant="dropdown"/>}

{dialogue ==="options" &&
 <List_of_groups
     title="List of Options"
          items={["Goods","Goods And Services","Services"]}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("option", value)}
          variant="dropdown"/>
}
{dialogue ==="calu method" &&
 <List_of_groups
     title="Method of Calculation"
          items={["Based on Quantity","Based on Value"]}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("method", value)}
          variant="dropdown"/>
}
{dialogue === "gst" && 
 <List_of_groups
     title="Applicability"
          items={["Not Applicable","Applicable"]}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("gst", value)}
          variant="dropdown"/>
}
{dialogue === "action"  && 
<List_of_groups
     title="HSN List of Action"
          items={["As per Company/Group","Specify Details Here","Use GST Classification"]}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("action", value)}
          variant="dropdown"/>

}
{dialogue === "gstaction"  && 
<List_of_groups
     title="GST List of Action"
          items={["As per Company/Group","Specify Details Here","Use GST Classification"]}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("gstaction", value)}
          variant="dropdown"/>

}
{dialogue ==="supply" &&
<List_of_groups
 title="Type of Supply"
          items={["Capital Goods","Goods","Services"]}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("supply", value)}
          variant="dropdown"/>
}
    </div>
  )
}

export default DirectIncome
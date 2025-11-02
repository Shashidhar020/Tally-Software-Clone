import React, { useEffect, useState } from "react";
import ListDialog from "./ListDialog";

const RightSection = ({ selectedItems, setSelectedItems }) => {

const[dialogue,setDialogType] = useState()
const [show, setShow] = useState(false);
const[gst,setGst ] = useState("Not Applicable")
const[action,setAction] = useState("As per Company/Group")
const[hsn,setHsn] = useState("")
const[description,setDescription] = useState("")
const[classification,setClassification] = useState("")
const[GstAction,setGstAction] = useState("As per Company/Group")
const[gstClassification,setgstClassification] = useState("")
const[supply,setSupply] = useState("Services")  
const[taxability,setTaxability] = useState("");  
const[taxType,setTaxType] = useState("Taxable") 
const[igst,setIgst] = useState(null)
const[cgst,setCgst]=useState(null)
const[sgst,setSgst] = useState(null)
  const GstApplicability = () => {
    
  };
useEffect(()=>{
 const gstState = selectedItems.find(i=>i.type=="gst")
     if(gstState) setGst(gstState.value)
      const actionState = selectedItems.find(i=>i.type=="action")
     if(actionState) setAction(actionState.value)
      const gstActionState = selectedItems.find(i=>i.type=="gstaction")
     if(gstActionState) setGstAction(gstActionState.value)
      const supplyState = selectedItems.find(i=>i.type=="supply")
     if(supplyState) setSupply(supplyState.value)
       const Igst = selectedItems.find(i=>i.type=="igst")
      if(Igst) setIgst(Igst.value)
      const Sgst = selectedItems.find(i=>i.type=="sgst")
      if(Sgst) setSgst(Sgst.value)
      const Cgst = selectedItems.find(i=>i.type=="cgst")
      if(Cgst) setCgst(Cgst.value) 
},[selectedItems])
  const handleSelect = (type, value) => {
      if( type==="gst") setGst(value)
        if(type == "action") setAction(value)
        if(type == "gstaction") setGstAction(value)
        if(type === "supply") setSupply(value) 
        if(type === "taxtype") setTaxType(value)
      
    setSelectedItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.type === type);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].value = value;
        return updated;
      }
      return [...prev, { type, value }];
    });

    setDialogType(null)
  };
 const handleGst=(e)=>{
   const newIgst = e.target.value;
   setIgst(newIgst);
   const newCgst = newIgst / 2;
   const newSgst = newIgst / 2;
   setCgst(newCgst);
   setSgst(newSgst);
   handleSelect("igst", newIgst);
   handleSelect("cgst", newCgst);
   handleSelect("sgst", newSgst);
 }
  
  return (
    <div>
      <h4><u>Statutory Details</u></h4>
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
          <p  style={{marginTop:"-13px"}}><span>HSN/SAC</span><span style={{marginLeft:"171px"}}>:</span></p>
          <p  style={{marginTop:"-13px"}}><span>Description</span><span style={{marginLeft:"164px"}}>:</span></p>
          </div>
        }
        {action === "Specify Details Here" &&
        <div>
          <p  style={{marginTop:"-13px"}}><span>HSN/SAC</span><span style={{marginLeft:"172px"}}>:<input type="text" value={hsn} onChange={(e)=>setHsn(e.target.value)} style={{border:"none"}}/></span></p>
          <p  style={{marginTop:"-13px"}}><span>Description</span><span style={{marginLeft:"165px"}}>:<input type="text" value ={description} onChange={(e)=>setDescription(e.target.value)} style={{border:"none"}}/></span></p>
        </div>
        }
         {action === "Use GST Classification" && 
        <div style={{display:"inline",  gap: "3px"}}>
          <p  style={{marginTop:"-13px"}}><span>Classification</span><span style={{marginLeft:"152px"}}>:<input type="text" value={classification} onChange={(e)=>setClassification(e.target.value) } style={{border:"none"}}/></span></p>
          <p  style={{marginTop:"-13px",opacity:"50%"}}><span>HSN/SAC</span><span style={{marginLeft:"173px"}}>:</span></p>
          <p  style={{marginTop:"-13px",opacity:"50%"}}><span>Description</span><span style={{marginLeft:"166px"}}>:</span></p>
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
            <p style={{marginTop:"-13px"}}><span>Source of Details</span><span style={{marginLeft:"125.5px"}}><b>:Not Available</b></span></p>
            <p style={{marginTop:"-13px"}}><span>Taxability type</span><span style={{marginLeft:"140px"}}><b>:0%</b></span></p>
            <p style={{marginTop:"-13px"}}><span>IGST Rate</span><span style={{marginLeft:"168px"}}><b>:0%</b></span></p>
            <p style={{marginTop:"-13px"}}><span>CGST Rate</span><span style={{marginLeft:"163px"}}><b>:0%</b></span></p>
            <p style={{marginTop:"-13px"}}><span>SGST/UTGST Rate</span><span style={{marginLeft:"109px"}}><b>:0%</b></span></p>
          </div>
          
          }

          {GstAction === "Use GST Classification"
          &&
          <div>
            
            <p style={{marginTop:"-13px"}}><span>Classification</span><span style={{marginLeft:"148px"}}><b>:<input type="text" value={gstClassification} onChange={(e)=>setgstClassification(e.target.value)} style={{border:"transparent"}}/></b></span></p>
            <p style={{marginTop:"-13px"}}><span>Taxability type</span><span style={{marginLeft:"140px"}}><b>:0%</b></span></p>
            <p style={{marginTop:"-13px"}}><span>IGST Rate</span><span style={{marginLeft:"167px"}}><b>:0%</b></span></p>
            <p style={{marginTop:"-13px"}}><span>CGST Rate</span><span style={{marginLeft:"162px"}}><b>:0%</b></span></p>
            <p style={{marginTop:"-13px"}}><span>SGST/UTGST Rate</span><span style={{marginLeft:"107px"}}><b>:0%</b></span></p>
    
            
          </div>
          
          }

          {
           GstAction === "Specify Details Here" &&
           <div>
            <p style={{marginTop:"-13px"}} onClick={()=>setDialogType("taxability")}><span>Taxability type</span><span style={{marginLeft:"140px"}}><b>:{taxType}</b></span></p>

            {taxType ==="Taxable" && 
            <div> 
             <p style={{marginTop:"-13px"}}><span>IGST Rate</span><span style={{marginLeft:"168px"}}><b>:<input type="text" value={igst} onChange={(e)=>handleGst(e)} style={{border:"transparent"}}/></b></span></p>
             <p style={{marginTop:"-13px"}}><span>CGST Rate</span><span style={{marginLeft:"162px"}}><b>:<input type="text" value={cgst} onChange={(e)=>{
              const value= e.target.value
              setCgst(value)
              handleSelect("cgst",value)}} style={{border:"transparent"}}/></b></span></p>
             <p style={{marginTop:"-13px"}}><span>SGST/UTGST Rate</span><span style={{marginLeft:"107px"}}><b>:<input type="text" value={sgst} onChange={(e)=>{ const value= e.target.value
              setSgst(value)
              handleSelect("sgst",value)}} style={{border:"transparent"}}/></b></span></p>
            </div>
            
            }
            { (taxType == "Exempt" || taxType == "Nil Rated"  || taxType =="NON GST") &&
            <div>
            <p style={{marginTop:"-13px",opacity:"50%"}}><span>IGST Rate</span><span style={{marginLeft:"168px"}}><b>:0%</b></span></p>
            <p style={{marginTop:"-13px",opacity:"50%"}}><span>CGST Rate</span><span style={{marginLeft:"162px"}}><b>:0%</b></span></p>
            <p style={{marginTop:"-13px",opacity:"50%"}}><span>SGST/UTGST Rate</span><span style={{marginLeft:"107px"}}><b>:0%</b></span></p>
            </div>
            }
             </div>
          }
          </div>
          <div>
            <p onClick={()=>setDialogType("supply")} style={{marginTop:"-13px"}}  className="under-div" tabIndex={0}><span>Type of Supply</span><span style={{marginLeft:"137px"}}><b>:{supply}</b></span></p>
          </div>
      </div>
       
      }

      

      {dialogue === "gst" && 
       <ListDialog
           title="Applicability"
                items={["Not Applicable","Applicable"]}
                onClose={() => setDialogType(null)}
                onSelect={(value) => handleSelect("gst", value)}
                variant="dropdown"/>
      }
      {dialogue === "action"  && 
      <ListDialog
           title="HSN List of Action"
                items={["As per Company/Group","Specify Details Here","Use GST Classification"]}
                onClose={() => setDialogType(null)}
                onSelect={(value) => handleSelect("action", value)}
                variant="dropdown"/>
      
      }
      {dialogue === "gstaction"  && 
      <ListDialog
           title="GST List of Action"
                items={["As per Company/Group","Specify Details Here","Use GST Classification"]}
                onClose={() => setDialogType(null)}
                onSelect={(value) => handleSelect("gstaction", value)}
                variant="dropdown"/>
      
      }
      {dialogue ==="supply" &&
      <ListDialog
       title="Type of Supply"
                items={["Capital Goods","Goods","Services"]}
                onClose={() => setDialogType(null)}
                onSelect={(value) => handleSelect("supply", value)}
                variant="dropdown"/>
      }
      {dialogue ==="taxability" &&
       <ListDialog
       title="Taxability Types"
                items={["Exempt","Nil Rated","NON GST","Taxable"]}
                onClose={() => setDialogType(null)}
                onSelect={(value) => handleSelect("taxtype", value)}
                variant="dropdown"/>
      }
    </div>
  );
};

export default RightSection;

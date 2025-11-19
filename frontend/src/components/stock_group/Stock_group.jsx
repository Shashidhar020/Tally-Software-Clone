import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ListDialog from "./ListDialog";

const Stock_group = () => {
const{name:stockGroupParam} = useParams()
const navigate = useNavigate();
const[dialogue,setDialogType] = useState()
const [show, setShow] = useState(false);
const[name,setName] = useState("")
const[selectedItems,setSelectedItems] =useState([])
const[under,setUnder] = useState("")
const[gst,setGst ] = useState("Applicable")
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
const[groups,setGroups] = useState(["Primary","Direct Income","Direct Expenses","Current Assest","Current Liability","Indirect Expenses","Indirect Incomes","Sales Accounts","Bank Accounts","Cash In Hand","Sundry Creditors","Sundry Debitors","BankAccount"])
const[additems,setAddItems] = useState(false)
  

  useEffect(() => {
    try {
      
      const allGroups = JSON.parse(localStorage.getItem("StockGroups") || "[]");
      const groupNames = allGroups.map((group) => group.name);
      setGroups((prev) => [...new  Set([...prev, ...groupNames])])
      if (stockGroupParam && stockGroupParam !== "new") {
        const group = allGroups.find(s => s.name === stockGroupParam);
        if (group) {
          setName(group.name);
          setUnder(group.under)
          setSelectedItems(group.items || []);

        }
      }
    } catch (error) {
      console.error("Error parsing sales records from localStorage:", error);
    }
  }, [stockGroupParam]);


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

const save =()=>{
if(!name.trim()) {
    alert("Name should not null")
    return;
}

try{
   const new_group = {
    name:name,
    items:selectedItems,
    under:under,
    groups:groups
   }
   
const existingGroups = localStorage.getItem("StockGroups")
let ledgerList = []
if (existingGroups) {
    try {
        ledgerList = JSON.parse(existingGroups)
        if (!Array.isArray(ledgerList)) {
            ledgerList = []
        }
    } catch (parseError) {
        console.error("Error parsing existing StockGroups:", parseError)
        ledgerList = []
    }
}

 if (stockGroupParam && stockGroupParam !== "new") {
      const index = ledgerList.findIndex(s => s.name === stockGroupParam);
      if (index !== -1) {
        if (new_group.name !== stockGroupParam) {
          const duplicateIndex =    ledgerList.findIndex(s => s.name === new_group.name);
          if (duplicateIndex !== -1) {
            alert("A sale with this account already exists. Please choose a different account.");
            return;
          }
        }
        ledgerList[index] = new_group;
      } else {
        const duplicateIndex = ledgerList.findIndex(s => s.name === new_group.name);
        if (duplicateIndex !== -1) {
          alert("A sale with this account already exists. Please choose a different account or edit the existing one.");
          return;
        }
        ledgerList.push(new_group);
      }
    } else {
      const existingIndex =   ledgerList.findIndex(s => s.name === name);
      if (existingIndex !== -1) {
        alert("A sale with this account already exists. Please choose a different account or edit the existing one.");
        
        navigate(`/stockGroup/${encodeURIComponent(stockGroupParam)}`);
        return;
      }
      ledgerList.push(new_group)
    }

localStorage.setItem("StockGroups",JSON.stringify(ledgerList))
alert("Stock Group is Added")
  navigate("/stockGroup");
}
catch(error){
console.error("Error saving stock group:", error)
}

}
  const handleSelect = (type, value) => {
      if( type==="gst") setGst(value)
        if(type == "action") setAction(value)
        if(type == "gstaction") setGstAction(value)
        if(type === "supply") setSupply(value) 
        if(type === "taxtype") setTaxType(value)
        if(type==="under") setUnder(value)  
      
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

<div >
    <div className="stock_group">
        <div>
            <p ><span>Name</span><span style={{marginLeft:"205px"}}><b>:</b><input type="text" value={name} onChange={(e)=>setName(e.target.value)} style={{border:"transparent"}}/></span></p>
        </div>
        <div>
             <p onClick={()=>setDialogType("under")} className="under-div" tabIndex={0}><span>Under</span><span style={{marginLeft:"201px"}}><b>:{under}</b></span></p>
        </div>
        <div>
          <p onClick={()=>setAddItems(!additems)}><span>Should quantities of items be added</span><span style={{marginLeft:"12px"}}><b>:{additems?"Yes":"No"}</b></span></p>
        </div>
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
            <p style={{marginTop:"-13px"}} onClick={()=>setDialogType("taxability")} className="under-div" tabIndex={0}><span>Taxability type</span><span style={{marginLeft:"140px"}}><b>:{taxType}</b></span></p>

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
    {dialogue ==="under" &&
       <ListDialog
       title="List of Groups"
                items={groups}
                onClose={() => setDialogType(null)}
                onSelect={(value) => handleSelect("under", value)}
                variant="dropdown"/>
      }
    </div>
      <p style={{position:"fixed",top:"93%",width:"100%",height:"20px", padding:"5px",backgroundColor:"#000000dd",display:"flex",justifyContent:"space-evenly",left:"-2px"}}>
          <span style={{padding:"5px"}}> <button type="button" onClick={save} style={{backgroundColor:"green"}}>Save</button></span><span style={{padding:"5px"}}> <button type="button"  style={{marginLeft:"20px",backgroundColor:"red",top:"20%"}}>Delete</button></span>
         <span><button type="button" onClick={()=>navigate("/stockGroup")} style={{backgroundColor:"#ccc",width:"100px",marginLeft:"10px"}}>Back to List</button></span>
         </p>
    </div>    
  );
};

export default Stock_group

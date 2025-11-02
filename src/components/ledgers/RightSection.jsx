import React from "react";
import { useState,useEffect,useRef } from "react";
import States from "../../dialogues/States";
import List_of_groups from "../../dialogues/List_of_groups";
import Country from "../../dialogues/Country";
const RightSection = ({ selectedItems, setSelectedItems, LedgerName}) => {
  const [state, setState] = useState("Karnataka");
    const [country, setCountry] = useState("India");
    const [gstRateValue, setGstRateValue] = useState("As per Company/Stock Group");
    const [supply, setSupply] = useState("Goods");
    const [registration, setRegistration] = useState("Unknown");
    const [showRight, setShowRight] = useState(false);
    const [items, setItems] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [showBank, setShowBank] = useState(false);
    const [current, setCurrent] = useState('');
    const [GSTIN, setGSTIN] = useState("");
    const [alter, setAlter] = useState(false);
    const[dialogType,setDialogType] = useState(null)
    const[name,setName] = useState("")
    const[pincode,setPinCode] = useState("")
    const[panNO,setPanNo] = useState("")
    const nameRef = useRef()
    const addressRef = useRef()
    const stateRef = useRef()
    const countryRef = useRef()
    const pincodeRef = useRef()
    const bankDetailsRef = useRef()
     const panRef = useRef()
     const registrationRef = useRef()
     const gstinRef = useRef()
     

     useEffect(() => {
        const nameItem = selectedItems.find(i => i.type === "Name");
        if (nameItem) setName(nameItem.value);
    
        const pincodeItem = selectedItems.find(i => i.type === "Pincode");
        if (pincodeItem) setPinCode(pincodeItem.value);
    
        const panItem = selectedItems.find(i => i.type === "PAN/IT No");
        if (panItem) setPanNo(panItem.value);
    
        const gstinItem = selectedItems.find(i => i.type === "GSTIN/UIN");
        if (gstinItem) setGSTIN(gstinItem.value);
    
        const addressItem = selectedItems.find(i => i.type === "Address");
        if (addressItem) setAddresses(addressItem.value.split(", "));
    
        const stateItem = selectedItems.find(i => i.type === "States");
        if (stateItem) setState(stateItem.value);
    
        const countryItem = selectedItems.find(i => i.type === "country");
        if (countryItem) setCountry(countryItem.value);
    
        const registrationItem = selectedItems.find(i => i.type === "Registration");
        if (registrationItem) setRegistration(registrationItem.value);
    
        const showBankItem = selectedItems.find(i => i.type === "Show Bank");
        if (showBankItem) setShowBank(showBankItem.value === true);

        const alterItem = selectedItems.find(i => i.type === "Set Alter Additional Details");
        if (alterItem) setAlter(alterItem.value === true);
      }, [selectedItems]);
    
  const updateItem = (index, value) => {
    const updated = [...addresses];
    updated[index] = value;
    setAddresses(updated);
    setSelectedItems((prev) => [
      ...prev.filter((i) => i.type !== "Address"),
      { type: "Address", value: updated.join(", ") },
    ]);
  };
  const addNewItem = (e) => {
   if (e.key === "Enter" && current.trim() !== "") {
      e.preventDefault();
      const newAddrs = [...addresses, current];
      setAddresses(newAddrs);
      setSelectedItems((prev) => [
        ...prev.filter((i) => i.type !== "Address"),
        { type: "Address", value: newAddrs.join(", ") },
      ]);
      setCurrent("");
    }
  };
  const GstApplicability = () => {
    
  };

  const handleSelect = (type, value) => {
    if (type === "States") setState(value);
    if (type === "country") setCountry(value);
    if (type === "Type of Supply") setSupply(value);
    if(type==="Registration") setRegistration(value);
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

  
  return (
    <div>
      <h4><u>Mailing Details</u></h4>
      <div
        style={{ marginTop:"-16px" }}
        onClick={GstApplicability}
        onDoubleClick={() => setShowRight(!showRight)}

      >
        Name <span style={{marginLeft:"141px"}}><b>:</b><input type="text" style={{border:"none",fontWeight:"bold"}} ref={nameRef} value={name} onChange={(e)=>{
          const value = e.target.value?e.target.value:LedgerName
          setName(value)
          handleSelect("Name",value)
        }}
        onKeyDown={(e)=>{
          if(e.key === "Enter"){
            addressRef.current.focus()
          }
        }}
        /></span>
      </div>
      <div style ={{marginTop:"1px"}}>
        <span style={{marginLeft:"-1px"}}>Address </span>
        <div style={{marginLeft: "178px",marginTop:"-13px"}}>
          <b>:</b><input type="text" value={current} ref={addressRef} onChange={(e) => {
            
            setCurrent(e.target.value)
           
            }} onKeyDown={addNewItem}
           onKeyUp={(e)=>{
            if(e.current === "Enter"){
               addressRef.current.focus()
            }
           }}
            
            style={{border:"none",fontWeight:"bold"}} />
        </div>
        {addresses.map((item, index) => (
          <div key={index} style={{marginLeft: "180px", marginBottom: "5px"}}>
             <b></b><input type="text" value={item} ref={addressRef} onChange={(e) => {
              
              updateItem(index, e.target.value)
               
             }}
             onKeyDown={(e)=>{
          if(e.key === "Enter"){
            addressRef.current.focus()
          }
        }}
             
             style={{border:"none",fontWeight:"bold"}}/>
          </div>
        ))}
        
      </div>
    <div style={{marginTop:"13px"}}>
      <div>
        <p><span>State</span><span style={{marginLeft:"152px"}}><b>:<input type="text" style={{border:"none" ,fontWeight:"bold"}} value={state} onClick={()=>setDialogType("states")} onChange={(e)=>setState(e.target.value)}/></b></span></p>
      </div>
      <div>
        <p style={{marginTop:"-13px"}}><span>Country</span><span style={{marginLeft:"134px"}}><b>:<input type="text" style={{border:"none",fontWeight:"bold"}} value={country} onClick={()=>setDialogType("country")} onChange={(e)=>setCountry(e.target.value)}/></b></span></p>
      </div>
      <div>
        <p style={{marginTop:"-13px"}}><span>Pincode</span><span style={{marginLeft:"135px"}}><b>:<input type="text" style={{border:"none",fontWeight:"bold"}} value={pincode}
        onChange={(e)=>{const value= e.target.value
          setPinCode(value)
          handleSelect("Pincode",value)
        }}
        /></b></span></p>
      </div>
    </div>
      <div style={{width:"450px"}}>
        <h5><u>Banking Details</u></h5>
       <p onClick={() => { const newVal = !showBank; setShowBank(newVal); handleSelect("Show Bank", newVal); }} tabIndex={0} style={{marginTop:"-13px"}}>
     Provide Bank Details  <span style={{ color: "black", marginLeft:"58px",}}><b style={{color:"black"}}>:{showBank ? "Yes":"No"}</b></span></p>
      </div>      
<div>
 <h5><u>Tax Registration Details</u></h5>
  <p onClick={() => setDialogType("gst")}  tabIndex={0} style={{marginTop:"-13px"}}>
 PAN<b>/</b>IT No  <span style={{ color: "black",marginLeft:"115px"}} ><b style={{color:"black"}}>:</b><input type="text" style={{border:"none",fontWeight:"bold"}} value={panNO} onChange={(e)=>{
  const value = e.target.value
  setPanNo(value)
  handleSelect("PAN/IT No",value)
 }}/></span> </p>
</div>
         
       
<div>
 <p onClick={() => setDialogType("Registration")} 
       tabIndex={0} style={{marginTop:"-13px"}}>
        Registration Type <span style={{ color: "black",marginLeft:"80px" }}><b style={{color:"black"}}>:{registration}</b></span>
      </p>
      <div style={{marginLeft:"20px"}}>
      <p style={{marginTop:"-13px"}}><span>GSTIN/UIN</span><span style={{marginLeft:"93px"}}><b>:</b><input type="text" style={{border:"none", fontWeight:"bold"}} value={GSTIN} onChange={(e)=>
        {const value= e.target.value
        setGSTIN(value)
        handleSelect("GSTIN/UIN",value)
        }}/></span></p>
      <p style={{marginTop:"-13px"}} onClick={()=>{ const newVal = !alter; setAlter(newVal); handleSelect("Set Alter Additional Details", newVal); }}>Set Alter Additional Details<span style={{marginLeft:"8px"}}><b>:{alter ? "Yes":"No"}</b></span></p>
      </div>
</div>
{dialogType  === "Registration" &&
<List_of_groups
title="Registration Types"
items={["Unknown","Composition","Regular","Unregistered/Consumer"]}
 onClose={() => setDialogType(null)}
onSelect={(value) => handleSelect("Registration", value)}
variant="dropdown"

/>
}
     {dialogType ==="states" &&
     <States 
         title="List of States"
          items={[
      "Andhra Pradesh",
      "Arunachal Pradesh",
     "Assam",
    "Bihar",
   "Chhattisgarh",
     "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
]}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("States", value)}
          variant="dropdown"
     />
     }

      {dialogType ==="country" &&
     <Country
         title="List of Country"
          items={[
  "India",
  "United States",
  "Canada",
  "Brazil",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Russia",
  "China",
  "Japan",
  "South Korea",
  "Australia",
  "New Zealand",
  "South Africa",
  "Egypt",
  "Nigeria",
  "Kenya",
  "Mexico",
  "Argentina",
  "Chile",
  "Colombia",
  "Peru",
  "Turkey",
  "Saudi Arabia",
  "United Arab Emirates",
  "Thailand",
  "Vietnam",
  "Indonesia"
]}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("country", value)}
          variant="dropdown"
     />
     }
    </div>
  );
};

export default RightSection

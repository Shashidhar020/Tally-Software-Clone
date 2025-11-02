import React, { useEffect, useState } from "react";
import ListDialog from "./ListDialog";

const LeftSection = ({ selectedItems, setSelectedItems }) => {
  const [dialogType, setDialogType] = useState(null);
  const [underValue, setUnderValue] = useState("♦ Primary");
  const [unitValue, setUnitValue] = useState("♦ Not Applicable");
  const[groups,setGroups] = useState(["♦ Primary"])


useEffect(()=>{
  try{
    const allStockGroups = JSON.parse(localStorage.getItem("StockGroups"))
    const groupNames = allStockGroups.map((group) => group.name);
    setGroups((prev) => [...new  Set([...prev, ...groupNames])])
  }
  catch(error){
    console.error(error)
  }
},[])

 useEffect(()=>{
  const underItem = selectedItems.find(i => i.type === "Under");
  if (underItem) {
    
    setUnderValue(underItem.value);
  }
  const unitValue = selectedItems.find(i=>i.type=="Units");
  if(unitValue)setUnitValue(unitValue.value)

 },[selectedItems])


  const handleSelect = (type, value) => {
    if (type === "Under") setUnderValue(value);
    if (type === "Units") setUnitValue(value);

 
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
      <div onClick={() => setDialogType("under")} style={{width:"300px"}}
      className="under-div" 
       tabIndex={0}
        >
        <label style={{ width:"25px"}}>Under </label>
        <span style={{ color: "black",
          marginLeft:"40px", width:"40px"
         }}    ><b style={{color:"black"}}>:</b>{underValue}</span>
      </div>

      <div onClick={() => setDialogType("units")}
         className="under-div"
       tabIndex={0}>
        <label  style={{ width:"25px"}}>Units </label>&nbsp;
        <span style={{ color: "black",  marginLeft:"41px", }}><b style={{color:"black"}}>:</b>{unitValue}</span>
      </div>

      {dialogType === "under" && (
        <ListDialog
          title="List of Groups"
          items={groups}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("Under", value)}
          variant="dropdown"
        />
      )}

      {dialogType === "units" && (
        <ListDialog
          title="Units"
          items={["♦ Not Applicable", "Pcs"]}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("Units", value)}
          variant="dropdown"
        />
      )}
    </div>
  );
};

export default LeftSection;

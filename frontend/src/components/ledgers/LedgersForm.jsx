import React, { useState, useEffect,useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LeftSection from './LeftSection'
import RightSection from './RightSection'
const LedgersForm = () => {
  
 const counter = useSelector(state=>state.counter)
   const navigate = useNavigate();
  const { name: ledgerNameParam } = useParams(); 
  const [name, setName] = useState("");
  const [placeholder, setPlaceholder] = useState('');
  const [isError, setIsError] = useState(false);
  const [ledgers, setLedgers] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const[balance,setBalance] = useState("");
   const [isEditing, setIsEditing] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  
 
  useEffect(() => {
  
    if(ledgerNameParam){
    const savedData = JSON.parse(localStorage.getItem('ledgerList')) || [];
    const found = savedData.find(i=>i.name===ledgerNameParam)
    if (found) {
        setName(found.name);
        setBalance(found.openingBalance || "");
        setSelectedItems(found.items || []);
        setIsEditing(true);   
    }
  }
  }, [ledgerNameParam]);

  

  const ledgerstoggle = () => {
    setLedgers(!ledgers);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && name.trim() === "") {
      setPlaceholder("Enter the name");
      setIsError(true);
    }
    else {
      setIsError(false)
    }
  };

  function openInput() {
    setShowInput(!showInput);
  }

  const handleSave = () => {
    
  if(!name.trim()){
  alert("Ledger name cannot be empty.");
  setIsError(true);
  return;
 }
const newLedger = {
      name,
      openingBalance: balance,
      items: selectedItems,
      under: selectedItems.find((i) => i.type === "Under")?.value || "",
    };  
let ledgerList = JSON.parse(localStorage.getItem("ledgerList")) || [];

 if (isEditing) {
      // Update existing
    
      ledgerList = ledgerList.map((l) =>
        l.name === ledgerNameParam ? newLedger : l 
      );
    } else {
      // Add new
    const existingindex = ledgerList.findIndex(i=>i.name ===  name)
    console.log(existingindex)
    if(existingindex !== -1){
     const confirm= window.confirm("A ledger with this name already exists. Please choose a different name or edit the existing one.")
     if(confirm){ 
     navigate("/")
     }
     else{
      navigate("/ledgers/new")
     }
      return;
    }
      ledgerList.push(newLedger);
      
    }

    localStorage.setItem("ledgerList", JSON.stringify(ledgerList));
    alert(isEditing ? "Ledger updated successfully!" : "Ledger saved!");
    
    navigate("/LedgerList"); // Go back to ledger list
  };

  const handleDelete = () => {
    if((window.confirm(`Delete ledger "${name}" permanently?`))){
    if (isEditing) {
      
      let ledgerList = JSON.parse(localStorage.getItem("ledgerList")) || [];
      ledgerList = ledgerList.filter((l) => l.name !== name);
      localStorage.setItem("ledgerList", JSON.stringify(ledgerList));
      alert("Ledger deleted successfully!");
    } else {
      alert("No ledger selected to delete.");
    }
  }
    navigate("/LedgerList");

  };
  
 

  return (
    <div style={{marginTop:"24px"}}>
    <div
      style={{
        border: "1px solid #ccc",
      padding:"2px",

        margin: "2px auto",
        fontSize:"14px"
      }}

    >
  
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <label style={{ width: "150px" }}>Name:</label>
        <b style={{color:"black"}}>:</b><input
          id="input-name"
          type="text"
          value={name}
          placeholder={placeholder}
          onChange={(e) => setName(e.target.value)}

          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
           border:"none"
          }}
        />

      </div>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <label style={{ width: "150px" }}>Total Opening Balance:</label>
        <b style={{color:"black"}}>:</b><input
          id="input-name"
          type="text"
          value={balance}
          placeholder={placeholder}
          onChange={(e)=>setBalance(e.target.value)}
          
          style={{
            flex: 1,
            border: "2px solid #afafafff",
            backgroundColor: "transparent",
          }}
        />

      </div>
     
      
      <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
        <div style={{ flex: 1, padding: "10px", borderRight: "1px solid #ddd" }}>
      
        <LeftSection
        items={selectedItems}
        setItems ={setSelectedItems}

        />
        </div>
        <div style={{ flex: 1, padding: "10px" }}>
          <RightSection
           selectedItems={selectedItems}
           setSelectedItems ={setSelectedItems}
           LedgerName={ledgerNameParam}
          />
        </div>
      </div>

      
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
        

      </div>

    </div>
     <div >
        <p style={{position:"fixed",top:"93%",width:"100%",textAlign:"center", padding:"5px",backgroundColor:"#000000dd",display:"flex",justifyContent:"space-evenly",left:"-6px"}}><span ><button type="button" onClick={handleSave} style={{backgroundColor:"green"}}>Save</button></span><span><button type="button" onClick={handleDelete} style={{backgroundColor:"red"}}>Delete</button></span> 
        <button
            onClick={() => navigate("/LedgerList")}
            style={{
              backgroundColor: "#2c6fbb",
              marginLeft:"10px",
              cursor: "pointer",
            }}
          >
             Back to List
          </button>
        </p>
      </div>
    </div>
  );
};

export default LedgersForm

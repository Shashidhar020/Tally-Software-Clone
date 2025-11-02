import React, { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const StockItemForm = () => {
  const navigate = useNavigate();
    const { name: ledgerNameParam } = useParams(); 
  const [name, setName] = useState("");
  const [placeholder, setPlaceholder] = useState();
  const [isError, setIsError] = useState(false);
  const [ledgers, setLedgers] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const[notes,setNotes] = useState("")
 const [selectedItems, setSelectedItems] = useState([]);
 const[groups,setGroups] = useState(["Primary"])

  useEffect(() => {
    try {
      const allItems = JSON.parse(localStorage.getItem("StockItems") || "[]");
      if (ledgerNameParam && ledgerNameParam !== "new") {
        const item = allItems.find(s => s.name === ledgerNameParam);
        if (item) {
          setName(item.name);
          setNotes(item.notes);
          setSelectedItems(item.items || []);
          setLedgers(item.ledger)
        
        }
      }
    } catch (error) {
      console.error("Error parsing sales records from localStorage:", error);
    }
  }, [ledgerNameParam]);
  // 🔑 Shared state for Left + Right + Crud
 





  const save = () => {
  if(!name.trim()){
  alert("StockItem name not be empty.");
  return;
 }
 let allStockItems;
    try {
      allStockItems = JSON.parse(localStorage.getItem("StockItems") || "[]");
    } catch (error) {
      console.error("Error parsing stockItem from localStorage:", error);
      allStockItems = [];
    }
if (!Array.isArray(allStockItems)) {
      allStockItems = allStockItems ? [allStockItems] : [];
    }
const newItem = {
      name,
      items: selectedItems,
      notes:notes,
      under: selectedItems.find((i) => i.type === "Under")?.value || "",
      ledger:ledgers,  
    }; 

     if (ledgerNameParam && ledgerNameParam !== "new") {
      // editing existing
      const index = allStockItems.findIndex(s => s.name === ledgerNameParam);
      if (index !== -1) {
        if (newItem .name !== ledgerNameParam) {
          const duplicateIndex = allStockItems.findIndex(s => s.name === newItem.name);
          if (duplicateIndex !== -1) {
            alert("A Item with this account already exists. Please choose a different account.");
            return;
          }
        }
        allStockItems[index] = newItem;
      } else {
        // not found, perhaps add
        const duplicateIndex = allStockItems.findIndex(s => s.name === newItem.name);
        if (duplicateIndex !== -1) {
          alert("A Item with this account already exists. Please choose a different account or edit the existing one.");
          return;
        }
        allStockItems.push(newItem);
      }
    } else {
      // new
      const existingIndex = allStockItems.findIndex(s => s.name === name);
      if (existingIndex !== -1) {
        alert("A items with this account already exists. Please choose a different account or edit the existing one.");
        
        navigate(`/stockItem/${encodeURIComponent(ledgerNameParam)}`);
        return;
      }
      allStockItems.push(newItem);
    }
    localStorage.setItem("StockItems", JSON.stringify(allStockItems));
    alert("Item saved successfully!");
    console.log("StockItems saved")
    navigate("/stockItem");

  };

  const ledgerstoggle = () => {
    setLedgers(!ledgers);
    
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && name.trim() === "") {
      setPlaceholder("Enter the name");
      setIsError(true);
    }
  };

  function openInput() {
    setShowInput(!showInput);
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        maxWidth: "900px",
        margin: "20px auto",
      }}
   
    >
      {/* Name */}
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <label style={{ width: "150px" }}>Name </label>
        <b style={{color:"black"}}>:</b><input
          id="input-name"
          type="text"
          value={name}
          placeholder={placeholder}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            border: isError ? "1px solid red" : "2px solid #ddd",
            backgroundColor: "transparent",
          }}
        />
      </div>

      {/* Notes */}
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <label style={{ width: "150px" }}>Notes </label>
        <b style={{color:"black"}}>:</b><textarea
          style={{
            flex: 1,
            height: "50px",
            resize: "none",
            width: "300px",
          }}
          value={notes}
          onChange={(e)=>setNotes(e.target.value)}
        />
      </div>

      {/* Ledger toggle */}
      <div style={{ marginBottom: "15px" }} onClick={ledgerstoggle}>
        Set/modify default ledgers for Invoicing {" "}
        <b style={{marginLeft:"20px"}}>:{ledgers ? "YES" : "NO"}</b>
      </div>

      {/* Left + Right sections */}
      <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
        <div style={{ flex: 1, padding: "10px", borderRight: "1px solid #ddd" }}>
          <LeftSection
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </div>
        <div style={{ flex: 1, padding: "10px" }}>
          <RightSection
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </div>
      </div>
<button
          onClick={save}
          style={{
            marginTop: "10px",
            padding: "5px 10px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      {/* CRUD rendered only once */}
      
     
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
        <span onClick={openInput}>Opening Balance :</span>
        <div style={{ display: "flex", gap: "40px" }}>
          <span>Quantity</span>
          <span>Rate per</span>
          <span>Value</span>
          {showInput && <input type="text" />}
        </div>
      </div>
    </div>
  );
};

export default StockItemForm;

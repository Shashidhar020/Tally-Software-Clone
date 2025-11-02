import React, { useState, useMemo, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import List_ledger_account from './List_ledger_account'
import List_stock_items from './List_stock_items'


function Sales() {
    const navigate = useNavigate();
  const { name: ledgerNameParam } = useParams(); 
  const [show, setShow] = useState(false);
  const[siNO,setSino] = useState()
  const [isEditing, setIsEditing] = useState(false);
  const [itemNumberCounter, setItemNumberCounter] = useState(1);
  const [account, setAccount] = useState("");
  const [date, setDate] = useState("");
  const [dayName, setDayName] = useState("");
  const [amount, setAmount] = useState();
  const [items, setItems] = useState([{ name: '', quantity: '', rate: '', amount: '', itemNumber: 1,cgst:'',sgst:'',igst:'' }]);
  const [editingIndex, setEditingIndex] = useState(null);
  const[narration,setNarration]=useState("")
  const[ledgerList,setLedgerList] = useState([])
  const[ledgerData,setLedgerData] = useState([])
  const[ledgeraccount,setLedgerAccount] = useState([])
  const[stockItem,setStockItem] = useState([])
  const[gst,setGst] = useState("")
  const[cgst,setCgst] = useState("")
  const[sgst,setSgst] = useState("")
  const[taxtype,setTaxType] = useState("%")
  
useEffect(() => {
  try {
    const allSales = JSON.parse(localStorage.getItem("salesRecords") || "[]");
    const allLedger = JSON.parse(localStorage.getItem("ledgerList") || "[]");

    
    if (ledgerNameParam && ledgerNameParam !== "new") {
      const sale = allSales.find(s => s.account === ledgerNameParam);
       const index = allSales.findIndex(s => s.account === ledgerNameParam);
      if (sale) {
        setAccount(sale.account);
        setDate(sale.date);
        setDayName(sale.dayName);
        
        setAmount(sale.balance)
        setSino(index+1)
        setItems(sale.items || [{ name: '', quantity: '', rate: '', amount: '', itemNumber: 1,cgst:'',sgst:''}]);
        setItemNumberCounter(sale.items ? sale.items.length + 1 : 2);
        setNarration(sale.narration || "");
      }
    }
  } catch (error) {
    console.error("Error parsing sales records from localStorage:", error);
  }
}, [ledgerNameParam]);

useEffect(()=>{
  try{
    const allLeddgerData = JSON.parse(localStorage.getItem("ledgerList"))
    const allStockItem = JSON.parse(localStorage.getItem("StockItems"))
    setLedgerData(allLeddgerData)
    setStockItem(allStockItem)
    
  
  }
  catch(error){
    console.error("Error parsing sales records from localStorage:", error)
  }
},[])

  const save = () => {
    if (!account.trim()) {
      alert("Account cannot be empty");
      return;
    }
    let allSales;
    try {
      allSales = JSON.parse(localStorage.getItem("salesRecords") || "[]");
    } catch (error) {
      console.error("Error parsing sales records from localStorage:", error);
      allSales = [];
    }
    if (!Array.isArray(allSales)) {
      allSales = allSales ? [allSales] : [];
    }
    const newSale = {
      account: account,
      date: date,
      dayName: dayName,
      balance: amount,
      items: items,
      totalQuantity: totalQuantity,
      totalAmount: totalAmount,
      narration: narration,
    };
    if (ledgerNameParam && ledgerNameParam !== "new") {
      // editing existing
      const index = allSales.findIndex(s => s.account === ledgerNameParam);
      if (index !== -1) {
        if (newSale.account !== ledgerNameParam) {
          const duplicateIndex = allSales.findIndex(s => s.account === newSale.account);
          if (duplicateIndex !== -1) {
            alert("A sale with this account already exists. Please choose a different account.");
            return;
          }
        }
        allSales[index] = newSale;
      } else {
        // not found, perhaps add
        const duplicateIndex = allSales.findIndex(s => s.account === newSale.account);
        if (duplicateIndex !== -1) {
          alert("A sale with this account already exists. Please choose a different account or edit the existing one.");
          return;
        }
        allSales.push(newSale);
      }
    } else {
      // new
      const existingIndex = allSales.findIndex(s => s.account === account);
      if (existingIndex !== -1) {
        alert("A sale with this account already exists. Please choose a different account or edit the existing one.");
        
        navigate(`/sales/${encodeURIComponent(ledgerNameParam)}`);
        return;
      }
      allSales.push(newSale);
    }
    localStorage.setItem("salesRecords", JSON.stringify(allSales));
    alert("Sale saved successfully!");
    console.log("Sales saved")
    navigate("/sales");
  };

  const handleAccountChange = (e,item) => {
    setAccount(e.target.value);
    
  };

  const renumberItems = () => {
    try {

    setItems((prevItems) =>
      prevItems.map((item, index) => ({
        ...item,
        itemNumber: index +1,
      }))
    );
    console.log(Date.now())
    }
    catch(error){
      console.log(error.message)
    }
   
    
  };

  const DeleteItem = (index) => {
    const deleteItem = items.filter((_,i)=>i!==index)

    setItems(items.filter((_, i) => i !== index));
   
    renumberItems()
    
  };


  const deleteFromLocalStorage =()=>{
   try {
    let confirm = window.confirm("Confirm to delete the sales")
    if(confirm){
    const allsales = JSON.parse(localStorage.getItem("salesRecords"))
     const items = allsales.filter(i=>i.account !== account)
     localStorage.setItem("salesRecords",JSON.stringify(items))
     navigate("/sales")
    }
    else {
      if(ledgerNameParam)
{      navigate(`/sales/${encodeURIComponent(ledgerNameParam)}`)
    }
    else {
      return
    }      
    }
   }
   catch(error) {
   console.log("Error",error)
   }
  }

  
  const handleChange = (e) => {
    try{
    const value = e.target.value;
    setDate(value);
    const date2 = new Date(value);
    if (!isNaN(date2)) {
      const options = { weekday: "long" };
      const day = new Intl.DateTimeFormat("en-US", options).format(date2);
      setDayName(day);
    } else {
      setDayName("Invalid date");
    }
    }
    catch(error){
      console.log(error.message)
    }
    
  };
const addGstElements = (item,index)=>{
  return(
    <p key={index}>
    <span></span>
    </p>
  )
}
  const addElement = (item, index) => {
    
    return (
      <p 
      key={index} > 
        <span><input type="text" style={{marginRight:"50px",width:"50px", border:"none"}} value={item.itemNumber} onChange={(e) => handleItemChange(index, 'itemNumber', e.target.value)}/></span>
        <span ><input type="text" value={item.name}
        onClick={() => { setEditingIndex(index); setShow("stock_item"); }} placeholder="Select the Item"
        onChange={(e) => handleItemChange(index, 'name', e.target.value)} style={{width:"200px",border:"transparent"}}/></span>
       <span  style={{ marginLeft: "200px"}}>
  <input
    type="text"
    value={`${item.quantity} Pcs`}
    onChange={(e) => {
      const onlyNumber = e.target.value.replace(/\D/g, ""); 
        handleItemChange(index, "quantity", onlyNumber);
    }}
    style={{ width: "100px", border: "0px transparent" }}
  />
</span>

        <span style={{marginLeft:"10px"}}><input type="text" value={`${item.rate}₹`}    onChange={(e) =>
          {
             const onlyNumber = e.target.value.replace(/\D/g, ""); 
           handleItemChange(index, 'rate', onlyNumber)}} style={{width:"100px",border:"transparent"}}/></span>
        <span
        onKeyUp={(index)=>addNewItem(index)}
        style={{marginLeft:"10px"}}><input type="text" value={`${item.amount} ₹`} onChange={(e) =>
           handleItemChange(index, 'amount', e.target.value)} style={{width:"100px", border:"transparent"}} readOnly /></span>
           <button type="button" style={{width:"50px",marginLeft:"10px",padding:"1px"}} onClick={()=>DeleteItem(index)}>Delete</button>
      </p>
    );
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === 'quantity' || field === 'rate' || field === 'cgst' || field === 'sgst') {
      const quantity = parseFloat(newItems[index].quantity) || 0;
      const rate = parseFloat(newItems[index].rate) || 0;
      const cgst = parseFloat(newItems[index].cgst) || 0;
      const sgst = parseFloat(newItems[index].sgst) || 0;
      const baseAmount = quantity * rate;
      const cgstAmount = baseAmount * (cgst / 100);
      const sgstAmount = baseAmount * (sgst / 100);
      newItems[index].amount = (baseAmount + cgstAmount + sgstAmount).toFixed(2);
    }
    setItems(newItems);
    if (field === 'itemNumber') {
      setTimeout(() => renumberItems(), 0);
    }
  };

  const addNewItem = (index) => {
   
    const newItemNumber = itemNumberCounter + 1;
    setItemNumberCounter(newItemNumber);
    setItems([...items,{ name: '', quantity: '', rate: '', amount: '', itemNumber: newItemNumber,cgst:'',sgst:'' }]);
    setTimeout(() => renumberItems(), 0);
  };

  const totalQuantity = useMemo(() => {
    return items.reduce((sum, item) => sum + (parseFloat(item.quantity) || 0), 0);
  }, [items]);

   const calculateTotalAmount = () => {
    return items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
}

const totalAmount = calculateTotalAmount();

 useMemo(()=>{
  
},[totalQuantity])

const handleSelect = (item) => {
    if (show === "ledger_account") {
      setAccount(item);
      try{
     const ledgerAccount = ledgerData.filter((i)=>i.name==item)
     const index = ledgerData.findIndex((i)=>i.name==item)
      
      setAmount(ledgerAccount[0].openingBalance)
      }
      catch(error){
     console.log(error)
      }
    }
    if (show === "stock_item" && editingIndex !== null) {
      const newItems = [...items];
      newItems[editingIndex].name = item;
      const stockAccount = stockItem.filter((i)=>i.name== item);
      
      const cgst = stockAccount[0]?.items?.find(i => i.type === "cgst")?.value || 0;
      const sgst = stockAccount[0]?.items?.find(i => i.type === "sgst")?.value || 0;
      const igst = stockAccount[0]?.items?.find(i => i.type === "igst")?.value || 0;
      
      newItems[editingIndex].cgst = cgst;
      newItems[editingIndex].sgst = sgst;
      newItems[editingIndex].igst = igst;
      setItems(newItems);

    }
    setShow(null);
    setEditingIndex(null);
  };

  return (
    <div style={{width:"100%", display: "flex", flexDirection: "column"}}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px"}}>
        <p style={{fontSize: "20px", margin: 0,marginTop:"-25px"}}>
          <button style={{backgroundColor: "green", width: "100px"}}>Sales</button>{" "}
          <span style={{ fontSize: "15px" }}>{siNO}</span>
        </p>
        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
          <input type="date" onChange={handleChange} value={date} style={{marginBottom: "10px",marginTop:"10px",width: "120px"}} />
          <input type="text" value={dayName} readOnly style={{width: "120px"}} />
        </div>
      </div>
      <div>
        <div onClick={() => setShow("ledger_account")}>
          <p>
            <span style={{fontWeight: "bold", fontSize: "15px", paddingBottom: "1px"}}>
              Party A/c Name:
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ marginLeft: "42px" }}>
              :<input type="text" value={account} onChange={(e,account)=>handleAccountChange(e,account)} />
            </span>
          </p>
        </div>
        <div style={{ marginTop: "-10px", borderBottom: "2px solid #2f2f2fff" }}>
          <p>
            <span style={{ fontSize: "15px", color:"#040303ff" }}>Current Balance</span>
            &nbsp;&nbsp;&nbsp;<span style={{marginLeft:"55px",color:"#000000ff"}}>:{amount}</span>
          </p>
        </div>
        <div>
          <p style={{ borderBottom: "2px solid #615f5fff"}}>
            <span style={{marginRight:"55px"}}>Item No</span>
            <span >Name of Item</span>
            <span style={{marginLeft: "31%" }}>Quantity</span>
            <span style={{marginLeft:"57px"}}>Rate/pcs</span>
            <span style={{marginLeft:"70px"}}>Amount</span>
          </p>
        </div>
        <div id="list" >
          {items.map((item, index) => addElement(item, index))}
        </div>
        <button onClick={addNewItem} style={{color:"transparent",border:"none",width:"100%"}}><u>Add Item</u></button>
        <div>
          <u></u>
        </div>
        <p style={{width:"100%"}}><u></u></p>
        <div>
          <p style={{marginLeft:"560px",padding:"5px",width:"600px"}}>
            <span >
              <span style={{marginLeft:"10px"}}>Total Quantity:{totalQuantity}{" "}Pcs</span><span style={{marginLeft:"50px"}}>Total Amount:{totalAmount.toFixed(2)}₹</span>
            </span>
          </p>
          <p style={{marginLeft:"560px",padding:"5px",width:"600px"}}></p>
          <div></div>
          <div style={{ display: "flex", marginBottom: "10px"}}>
            <label style={{ width: "100px" }}><b>Narration</b></label>
            <b style={{color:"black"}}>:</b><textarea
              style={{
                flex: 1,
                height: "25px",
                resize: "none",
                width: "900px",
                border:"none",
              }}
              value={narration}
              onChange={(e)=>setNarration(e.target.value)}
            />
          </div>
          <div style={{display: "flex", marginBottom: "10px", marginLeft:"55%", width:"400px"}}></div>
          <p style={{position:"fixed",top:"93%",width:"100%",textAlign:"center", padding:"5px",backgroundColor:"#000000dd",display:"flex",justifyContent:"space-evenly"}}>
            <span style={{padding:"5px"}}> <button type="button" onClick={save} style={{backgroundColor:"green"}}>Save</button></span>
            <span style={{padding:"5px"}}> <button type="button" onClick={deleteFromLocalStorage} style={{marginLeft:"20px",backgroundColor:"red"}}>Delete</button></span>
            <span><button type="button" onClick={()=>navigate("/sales")} style={{backgroundColor:"#ccc",width:"100px",marginLeft:"10px"}}>Back to List</button></span>
          </p>
        </div>
      </div>

      {show === "ledger_account" && (
        <List_ledger_account
          accounts={ledgerData}
          onClose={() => setShow(null)}
          onSelect={(item) => handleSelect(item)}
        />
      )}

      {show === "stock_item" && (
        <List_stock_items
          items={stockItem}
          onClose ={()=>setShow(null)}
          onSelect= {(item)=> handleSelect(item)}
        />
      )}
    </div>
  );
}

export default Sales;


import React from "react";
import { useState,useEffect, useRef } from "react";
import List_of_groups from "../../dialogues/List_of_groups";
import DirectIncome from "./DirectIncome";


const LeftSection = ({ items, setItems }) => {
   const [dialogType, setDialogType] = useState(null);
    const [underValue, setUnderValue] = useState("♦ Primary");
    const [taxtype, setTaxType] = useState("Not Applicable");

    const [show, setShow] = useState(true);
    const [show1, setShow1] = useState(true);
    const [option, setOption] = useState("Goods");
    const [method, setMethod] = useState("Based on Quality");
    const [balanceMaintain, setBalanceMaintain] = useState(true);
    const [period, setPeriod] = useState("");
    const [creditPeriodCheck, setCreditPeriodCheck] = useState(true);
    const [dialogPosition, setDialogPosition] = useState(null);
    const[accountHolderName,setAccountHolderName] = useState("")
    const[accountNo,setAccountNo] = useState("")
    const[ifsCode,setIfsCode] = useState("")
    const[swiftCode,setSwiftCode] = useState("")
    const[bankName,setBankName] = useState("")
    const[branchName,setBranchName] = useState("")
     const[groupName,setGroupName] = useState(["♦ Primary","Direct Income","Direct Expenses","Current Assest","Current Liability","Indirect Expenses","Indirect Incomes","Sales Accounts","Bank Accounts","Cash In Hand","Sundry Creditors","Sundry Debitors","BankAccount"])
    const accountHolderRef = useRef();
    const accountNoRef = useRef();
    const ifsCodeRef = useRef();
    const swiftCodeRef = useRef();
    const bankNameRef = useRef();
    const branchNameRef = useRef();
  

    useEffect(() => {
        const underItem = items.find(i => i.type === "Under");
        if (underItem) setUnderValue(underItem.value);
    
        const taxTypeItem = items.find(i => i.type === "Tax Type");
        if (taxTypeItem) setTaxType(taxTypeItem.value);
    
        const optionItem = items.find(i => i.type === "option");
        if (optionItem) setOption(optionItem.value);
    
        const methodItem = items.find(i => i.type === "method");
        if (methodItem) setMethod(methodItem.value);
    
        const balanceMaintainItem = items.find(i => i.type === "Maintenance balances bill-by-bill");
        if (balanceMaintainItem) setBalanceMaintain(balanceMaintainItem.value === true);

        const periodItem = items.find(i => i.type === "Default Credit Period");
        if (periodItem) setPeriod(periodItem.value);

        const creditPeriodCheckItem = items.find(i => i.type === "Check for credit days during voucher Entry");
        if (creditPeriodCheckItem) setCreditPeriodCheck(creditPeriodCheckItem.value === true);

        const accountHolderNameItem = items.find(i => i.type === "Account Holder Name");
        if (accountHolderNameItem) setAccountHolderName(accountHolderNameItem.value);

        const accountNoItem = items.find(i => i.type === "Account No");
        if (accountNoItem) setAccountNo(accountNoItem.value);

        const ifsCodeItem = items.find(i => i.type === "IFS Code");
        if (ifsCodeItem) setIfsCode(ifsCodeItem.value);

        const swiftCodeItem = items.find(i => i.type === "SWIFT Code");
        if (swiftCodeItem) setSwiftCode(swiftCodeItem.value);

        const bankNameItem = items.find(i => i.type === "Bank Name");
        if (bankNameItem) setBankName(bankNameItem.value);

        const branchNameItem = items.find(i => i.type === "Branch Name");
        if (branchNameItem) setBranchName(branchNameItem.value);
        const chequeBooks = items.find(i => i.type === "Set/Alter range for Cheque Books" );
        if(chequeBooks) setShow(chequeBooks.value === true)

        const enableCheque = items.find(i=> i.type === "Enable Cheque Printing");
        if(enableCheque) setShow1(enableCheque.value === true)
       
      }, [items]);
  
 useEffect(()=>{
  try{
   const groups= JSON.parse(localStorage.getItem("Groups"))
         const groupName = groups.map((group)=>group.name)
         setGroupName((prev)=>[...new Set([...prev,...groupName])])     
  }
  catch(error){
    console.log(error.message)
  }
         
      
        },[])
  
  
  const handleClick=()=>{
    const newShow = !show;
    setShow(newShow);
    handleSelect("Set/Alter range for Cheque Books", newShow);
  }
  const handleClick1=()=>{
    const newShow1 = !show1;
    setShow1(newShow1);
    handleSelect("Enable Cheque Printing", newShow1);
  }
  const handleSelect = (type, value) => {
    if (type === "Under") setUnderValue(value);
    if (type === "Units") setUnitValue(value);
    if(type==="Tax Type") setTaxType(value)
    if( type ==="option") setOption(value)
    if(type==="method") setMethod(value)
    
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

  };

  return (
    <div >
      <div onClick={(e) => { setDialogType("under"); const rect = e.currentTarget.getBoundingClientRect(); setDialogPosition({top: rect.bottom, left: rect.left}); }} style={{width:"400px"}}
      className="under-div"
       tabIndex={0}
        >
        <label style={{ width:"25px"}}>Under </label>
        <span style={{ color: "black",
          marginLeft:"40px", width:"40px"
         }}><b style={{color:"black",marginLeft:"154px"}}>:{underValue}</b></span>
      </div>
  

  {underValue ==="Bank Accounts" && <>
  <div>
    <div >
      <p><u><b>Bank Account Details</b></u></p>
       <div  style={{width:"430px",marginTop:"-13px"}}
     
       tabIndex={0}
        >
        <label style={{ width:"50px"}}>A/C Holder Name </label>
        <span style={{ color: "black",
          marginLeft:"125px", width:"40px"
         }} ><b>:<input type="text" ref={accountHolderRef} value={accountHolderName} onChange={(e) => {
     const value = e.target.value;
     setAccountHolderName(value);
     handleSelect("Account Holder Name", value);
}}
 onKeyDown={(e) => { if(e.key === 'Enter') accountNoRef.current.focus(); }}
 style={{border:"none",fontWeight:"bold"}}/></b></span>
      </div>
      <div  style={{width:"430px"}}
    
       tabIndex={0}
        >
        <label style={{ width:"50px"}}>A/C No</label>
        <span style={{ color: "black",
          marginLeft:"187px", width:"40px",
         fontWeight:"bold"}} >:<input type="text" ref={accountNoRef} style={{border:"none",fontWeight:"bold"}} value={accountNo} onChange={(e)=>{
          const value = e.target.value;
          setAccountNo(e.target.value)
           handleSelect("Account No", value);
          }} onKeyDown={(e) => { if(e.key === 'Enter') ifsCodeRef.current.focus(); }} /></span>
      </div>
      <div  style={{width:"430px"}}
     
       tabIndex={0}
        >
        <label style={{ width:"50px"}}>IFS Code </label>
        <span style={{ color: "black",
          marginLeft:"174px", width:"40px"
          , fontWeight:"bold"
         }} >:<input type="text" ref={ifsCodeRef} style={{border:"none",fontWeight:"bold"}} value={ifsCode} onChange={(e)=>{
          const value= e.target.value
          setIfsCode(e.target.value)
          handleSelect("IFS Code",value)
          }} onKeyDown={(e) => { if(e.key === 'Enter') swiftCodeRef.current.focus(); }}/></span>
      </div>
      <div  style={{width:"430px"}}
     
       tabIndex={0}
        >
        <label style={{ width:"50px"}}>SWIFT Code </label>
        <span style={{ color: "black",
          marginLeft:"153px", width:"40px",fontWeight:"bold"
         }} >:<input type="text" ref={swiftCodeRef} style={{border:"none",fontWeight:"bold"}} value={swiftCode} onChange={(e)=>{
          const value= e.target.value
          setSwiftCode(e.target.value)
         handleSelect("SWIFT Code", value)
         }} onKeyDown={(e) => { if(e.key === 'Enter') bankNameRef.current.focus(); }}/></span>
      </div>
      <div  style={{width:"430px"}}
    
       tabIndex={0}
        >
        <label style={{ width:"50px"}}>Bank Name </label>
        <span style={{ color: "black",
          marginLeft:"161px", width:"40px",fontWeight:"bold"
         }} >:<input type="text" ref={bankNameRef} style={{border:"none",fontWeight:"bold"}} value={bankName} onChange={(e)=>
         {const value = e.target.value
         setBankName(e.target.value)
         handleSelect("Bank Name",value)
         }} onKeyDown={(e) => { if(e.key === 'Enter') branchNameRef.current.focus(); }}/></span>
      </div>
      <div  style={{width:"430px"}}
      
       tabIndex={0}
        >
        <label style={{ width:"50px"}}>Branch </label>
        <span style={{ color: "black",
          marginLeft:"187px", width:"40px",fontWeight:"bold"
         }} >:<input type="text" ref={branchNameRef} style={{border:"none",fontWeight:"bold"}} value={branchName} onChange={(e)=>{
          const value = e.target.value
          setBranchName(e.target.value)
         handleSelect("Branch Name",value)
         }}/></span>
      </div>
        
    </div>

    <div>
    <div >
      <p><u><b>Bank Account Configuration</b></u></p>
       <div  style={{width:"330px",marginTop:"-13px"}}
     
       tabIndex={0}
       onClick={handleClick}
        >
        <label style={{ width:"50px"}}>Set/Alter range for Cheque Books</label>
        <span style={{ color: "black",
          marginLeft:"40px", width:"40px",fontWeight:"bold"
         }} >:{show? "Yes":"No"}</span>
      </div>
       <div  style={{width:"330px"}}
     
       tabIndex={0}
       onClick={handleClick1}
        >
        <label style={{ width:"50px"}}>Enable Cheque Printing</label>
        <span style={{ color: "black",
          marginLeft:"97px", width:"40px",fontWeight:"bold"
         }} >:{show1?"Yes":"No" }</span>
      </div>
      </div>
      </div>
  </div>
  
  </>}
{
  underValue === "Current Assest" &&
  <>
  <div>
    <p><u><b>Statutaory Details</b></u></p>
    <div onClick={()=>setDialogType("Tax Type")}>
      <p style={{marginTop:"-13px"}} className="under-div" tabIndex={0}><span>Include in assessable Value calucalation</span><span style={{marginLeft:"5px"}}>:<b>{taxtype}</b></span></p>
    </div>
    { taxtype === "GST" &&
    <div style={{marginLeft:"20px"}}>
     <div onClick={()=>setDialogType("options")}>
    <p style={{marginTop:"-13px"}}  className="under-div" tabIndex={0}><span>Appropriate to &nbsp;</span><span style={{marginLeft:"119px"}}>:<b>{option}</b></span></p>
    </div>
    <div onClick={()=>setDialogType("calu method")}>
      <p style={{marginTop:"-13px"}}  className="under-div" tabIndex={0}><span>Method of calucalation&nbsp;&nbsp;</span><span style={{marginLeft:"70px"}}>:<b>{method}</b></span></p>
    </div>
    </div>
    }
    
  </div>
  </>
}

{underValue === "Sundry Creditors" &&
<div>
  <p onClick={()=>{ const newVal = !balanceMaintain; setBalanceMaintain(newVal); handleSelect("Maintenance balances bill-by-bill", newVal); }}><span>Maintenance balances bill-by-bill</span><span style={{marginLeft:"43px"}}><b>:{balanceMaintain?"Yes":"No"}</b></span></p>
  {balanceMaintain && <div style={{fontSize:"13px"}}>
  <p style={{marginTop:"-13px"}}><span>Default Credit Period</span><span style={{marginLeft:"119px"}}><b>:<input type="text" value={period} onChange={(e)=> {
    const value= e.target.value
    setPeriod(value)
    handleSelect("Default Credit Period",value)
    }} style={{border:"none"}}/></b></span></p>
  <p onClick = {()=>{ const newVal = !creditPeriodCheck; setCreditPeriodCheck(newVal); handleSelect("Check for credit days during voucher Entry", newVal); }} style={{marginTop:"-13px"}}><span>Check for credit days during voucher Entry</span><span style={{marginLeft:"5px"}}><b>:{creditPeriodCheck ? "Yes":"No"}</b></span></p>
  </div>
  }
</div>
}
{underValue === "Sundry Debitors" &&
<div>
  <p onClick={()=>{ const newVal = !balanceMaintain; setBalanceMaintain(newVal); handleSelect("Maintenance balances bill-by-bill", newVal); }}><span>Maintenance balances bill-by-bill</span><span style={{marginLeft:"43px"}}><b>:{balanceMaintain?"Yes":"No"}</b></span></p>
  {balanceMaintain && <div style={{fontSize:"13px"}}>
  <p style={{marginTop:"-13px"}}><span>Default Credit Period</span><span style={{marginLeft:"119px"}}><b>:<input type="text" value={period} onChange={(e)=>{
    const value =e.target.value
    setPeriod(value)
    handleSelect("Default Credit Period",value)
    }} style={{border:"none"}}/></b></span></p>
  <p onClick = {()=>{ const newVal = !creditPeriodCheck; setCreditPeriodCheck(newVal); handleSelect("Check for credit days during voucher Entry", newVal); }} style={{marginTop:"-13px"}}><span>Check for credit days during voucher Entry</span><span style={{marginLeft:"5px"}}><b>:{creditPeriodCheck ? "Yes":"No"}</b></span></p>
  </div>
  }
</div>
}

{dialogType ==="options" &&
 <List_of_groups
     title="Options"
          items={["Goods","Goods And Services","Services"]}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("option", value)}
          variant="dropdown"/>
}
{dialogType ==="calu method" &&
 <List_of_groups
     title="Method of Calculations"
          items={["Based on Quantity","Based on Value"]}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("method", value)}
          variant="dropdown"/>
}
{underValue === "Direct Income" &&
<DirectIncome onSelect={()=>setDialogType("Ledger")} 
  items={items}
  setItems ={setItems}
  
  />
}

{dialogType === "Ledger" &&
<List_of_groups
     title="Types of Ledger"
          items={["Based on Quantity","Based on Value"]}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("method", value)}
          variant="dropdown"/>
}
  {dialogType === "under" &&

    <List_of_groups
     title="List of Groups"
          items={groupName}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("Under", value)}
          variant="dropdown"/>}

{ dialogType === "Tax Type" &&

    <List_of_groups
     title="Tax Type"
          items={["Not Applicable","GST"]}
          onClose={() => setDialogType(null)}
          onSelect={(value) => handleSelect("Tax Type", value)}
          variant="dropdown"/>}
        
    </div>
  );
};

export default LeftSection

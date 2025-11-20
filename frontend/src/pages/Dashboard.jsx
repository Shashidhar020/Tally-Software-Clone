import React, { useEffect, useReducer, useState,useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setStockGroups, setStockItems, setLedgers, setGroups, setSales, setTotalAmount,setTotalQuantity,setAllSalesRecord,setShowMenu} from '../redux/dashboardSlice'
import { Chart , LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend,Filler, plugins } from "chart.js";
import { Line } from "react-chartjs-2";
import List_sale_account from './List_sale_account';
import ListSaleDate from './ListSaleDate';
import Navbar from '../navPages/Navbar';
import { IoIosMenu } from "react-icons/io";
Chart.register(LineElement, CategoryScale, LinearScale,PointElement,Tooltip,Legend,Filler);

const options = {
  responsive: true,
  scales: {
    x: { title: { display: true, text: "Date" ,color:"black"},
     ticks: { color:"black", font: { size: 12} },
     grid:{
      color:"black"
     }
  },
    y: { title: { display: true, text: "Total Amount",color:"black" },
     grid:{
      color:"black"
     },
    ticks :{color:"black",font:{size:12}}
  },
  },
  plugins:{
    legend:{
      display:true, labels:{
        color:"black"
      }
    }
  }
  
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const[dialogue,setDialogue] = useState()
  const { stockGroups, stockItems, ledgers, groups,sales,totalAmount, totalQunatity, allSalesRecord,showMenu} = useSelector(state => state.dashboard);
  const {counter} = useSelector(state=>state.counter)
  const [chartData, setChartData] = useState(null);
  const[searchName,setSearchName] = useState("")
  const[dates,setDates] = useState([])
  const [from,setFrom] = useState('')
  const[to,setTo] = useState('')
  const [filteredDates, setFilteredDates] = useState([])
useEffect(() => {
  const fetchData = async () => {
    try {
      const allStockGroups = JSON.parse(localStorage.getItem("StockGroups") || "[]");
      const allGroups = JSON.parse(localStorage.getItem("Groups") || "[]");
      const allStockItems = JSON.parse(localStorage.getItem("StockItems") || "[]");
      const allLedgerList = JSON.parse(localStorage.getItem("ledgerList") || "[]");

      const res = await fetch("https://tally-software-backend-pff6-lypsz6px1.vercel.app/api/sales");

      if (!res.ok) {
        throw new Error("Failed to fetch sales data");
      }

      const allSalesRecords = await res.json(); // ✅ wait for JSON to resolve

      console.log(allSalesRecords);

      const total = allSalesRecords.reduce((sum, record) => sum + record.totalAmount, 0);
      const quantity = allSalesRecords.reduce((sum, record) => sum + record.totalQuantity, 0);

      dispatch(setTotalQuantity(quantity));
      dispatch(setTotalAmount(total));
      dispatch(setStockGroups(allStockGroups.length));
      dispatch(setGroups(allGroups.length));
      dispatch(setLedgers(allLedgerList.length));
      dispatch(setSales(allSalesRecords.length));
      dispatch(setStockItems(allStockItems.length));
      dispatch(setAllSalesRecord(allSalesRecords));
    } catch (error) {
      console.error("❌ Fetch error:", error.message);
    }
  };

  fetchData(); // ✅ run the async function
}, [dispatch]);


  useEffect(() => {
    const fetchSales = async()=>{
    try{
        const res = await fetch("https://tally-software-backend-pff6-lypsz6px1.vercel.app/api/sales");
      if (!res.ok) throw new Error("Failed to fetch sales data");
  const storedData = await res.json();
    if (storedData) {
      const sorted = storedData.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      const labels = sorted.map((sale) => sale.date);
      setDates(labels)
      const dataValues = sorted.map((sale) => sale.totalAmount);
      // 🔹 Prepare chart data
      setChartData({
        labels,
        datasets: [
          {
            label: "Total Sales Amount", 
            data: dataValues,
            fill: true,
            borderColor: "rgba(0, 91, 247, 1)",
            backgroundColor: "rgba(255, 255, 255, 1)",
            tension:0.5,
            pointRadius :5
          },
        ],
      });
      
    }
    }
    catch(error){
      console.log(error.message)
    }
  }
   fetchSales();
  }, []);


  useEffect(() => {
    try{
    if (dates.length > 0) {
      const filtered = dates.filter(date => {
        const d = new Date(date);
        const fromDate = from ? new Date(from) : null;
        const toDate = to ? new Date(to) : null;
        const afterFrom = fromDate ? d >= fromDate : true;
        const beforeTo = toDate ? d <= toDate : true;
        return afterFrom && beforeTo;
      });
      setFilteredDates(filtered);
    } else {
      setFilteredDates([]);
    }
    }
    catch(error){
    console.log(error.message)
    }
   
  }, [dates,from, to]);

  useEffect(()=>{

  },[searchName])
useEffect(() => {
  try{
 if (allSalesRecord.length > 0 && filteredDates.length > 0) {
    const filteredSales = allSalesRecord.filter((item) => filteredDates.includes(item.date));
    const total = filteredSales.reduce((sum, record) => sum + record.totalAmount, 0);
    const quantity = filteredSales.reduce((sum,record)=> sum + record.totalQuantity,0)
   dispatch(setTotalAmount(total.toFixed(2)))
   dispatch(setTotalQuantity(quantity))  
  } else {
    dispatch(setTotalAmount(0))
   dispatch(setTotalQuantity(0))
  }
  }
  catch(error){
    console.log(error.message)
  }
 
}, [allSalesRecord, filteredDates]);

const filteresName = allSalesRecord? allSalesRecord.filter((item)=>item.account.toLowerCase().includes(searchName.toLowerCase().trim())):[]
const amountByName = useMemo(()=>
{
   return filteresName.reduce((sum,record)=>sum + record.totalAmount,0)
},[filteresName])

const quantityBYName= useMemo(()=>{
  return filteresName.reduce((sum,record)=>sum + record.totalQuantity,0)
},[filteresName])
useEffect(()=>{
  try{
    if (searchName.trim() !== '') {
    dispatch(setTotalAmount(amountByName.toFixed(2)))
    dispatch(setTotalQuantity(quantityBYName))
  }
  }
  catch(error){
    console.log(error.message)
  }
 
},[quantityBYName,amountByName, searchName,filteresName])

const handleSelect =(type,item)=>{
if(type=="salesName"){
setSearchName(item.trim())
 setFrom('')
 setTo('')
console.log(item.trim())
setDialogue(null)
}
if(type =="salesFrom"){
  console.log((item.trim()))
  setFrom((item.trim()))  
  setSearchName('')
  setDialogue(null)
}
if(type=== "saleTo"){
  console.log(item.trim())
  setTo(item.trim())
  setSearchName('')
  setDialogue(null)
}
}


  return (
    <div style={{marginTop:"20px",marginLeft:showMenu?"25%":"0%"}} className="responsive-box" >
  <div>
  <h1 style={{textAlign:"center"}}>DashBoard</h1>
  </div>
  <div  className='searches'>
    <p className='search sale-name'><span>Sale Voucher:</span><span><input type="search" value={searchName}  placeholder='Enter Sale Voucher ' onChange={(e)=>{setSearchName(e.target.value)
      }} style={{border:"none", borderRadius:"4px",width:"150px"}}
      onClick={()=>setDialogue("salesName")}
      /></span></p>
    <p className='search sale-date'><span>From:</span><span><input type="date"  value={from}  onClick={()=>setDialogue("salesFrom")} onChange={(e)=>{setFrom(e.target.value)  
    
     setSearchName('')}} style={{border:"none",borderRadius:"4px"}}/></span><span className='to'>&nbsp;&nbsp;&nbsp;To:</span><span><input type="date" value={to}  onClick={()=>setDialogue("saleTo")} onChange={(e)=>{setTo(e.target.value)
   setSearchName('')}}  style={{border:"none", borderRadius:"4px"}}/></span></p>
    
  </div>
   <div style={{display:"flex", justifyContent:"space-evenly",marginTop:"-50px"}} className="dashboard-tables">
  <div className='dashboard-table counts sal'  onClick={()=>navigate('/sales')}>
    <div className='total sales'>
      <h2>Total Sales</h2>
        <h3>{sales}</h3>
    </div>
  </div>
  <div className='dashboard-table counts qs'>

    <div className='total sq'>
      <h2>Total Quantity Sold</h2>
      <h3 >{totalQunatity}</h3>
    </div>
    
  </div>
  <div className='dashboard-table counts ta'>
    <div className='total sa'>
       <h2>Total Amount</h2>
    <h3 >{totalAmount}</h3>
    
    </div>
   
  </div>
  <div className='dashboard-table counts tg' onClick={()=>navigate('/group')}>
    <div className='total groups'>
   <h2>Total Groups</h2>
     <h3>{groups}</h3>
    </div>
   
  </div>
  <div className='dashboard-table counts tl' onClick={()=>navigate('/LedgerList')}>
    <div className='total ledgers'>
       <h2>Total Ledgers</h2>
     <h3>{ledgers}</h3>
    </div>
   
  </div>
  <div className='dashboard-table counts tsi' onClick={()=>navigate('/stockItem')}>
   <div className='total sold'>
    <h2>Total Stock Items</h2>
     <h3>{stockItems}</h3>
   </div>
   
  </div>
  <div className='dashboard-table counts tsg' onClick={()=>navigate('/stockGroup')}>
   <div className='total sg'>
    <h2>Total Stock Groups</h2>
     <h3>{stockGroups}</h3>
   </div>
   
  </div>
   </div>
   <div className='sales-dashboard'>
     <div className='d1-chart'>
  {chartData ? (
        <>
          <h2 style={{textAlign:"center",color:"black"}}>Sales Over Time</h2>
        <Line data={chartData} options={options} />
        </>
      ) : (
        <p style={{textAlign:"center"}}>No sales data found</p>
      )}
  </div>
   </div>
   { dialogue ==="salesName" &&
  <List_sale_account 
  accounts={allSalesRecord}
  onClose={()=>setDialogue(null)}
   onSelect={(item) => handleSelect("salesName",item)}
  />
   }
   {dialogue === "salesFrom" && 
   <ListSaleDate
     accounts={allSalesRecord}
     onClose={()=>setDialogue(null)}
     onSelect={(item) => handleSelect("salesFrom",item)}
   />
   }
  {
    dialogue ==="saleTo" &&
    <ListSaleDate
     accounts={allSalesRecord}
     onClose={()=>setDialogue(null)}
     onSelect={(item) => handleSelect("saleTo",item)}
    />
  }
    <div className={showMenu?"hamburger-menu":"not-hamburger-menu"} onClick={()=>dispatch(setShowMenu(!showMenu))} >
       <span className='menu-icon'><IoIosMenu /></span> </div> 
      <div>
        {showMenu  &&
        <Navbar/>
        }
      </div>
   </div>
  )
}
export default Dashboard
import ArInfo from '../assets/arInfo.jpg'
import { IoIosMenu } from "react-icons/io";
import React, { useEffect, useReducer, useState,useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { setStockGroups, setStockItems, setLedgers, setGroups, setSales, setTotalAmount,setTotalQuantity,setAllSalesRecord,setShowMenu} from '../redux/dashboardSlice'
import {  Chart,CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  RadialLinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler, } from "chart.js";
import { Line,Bar,Doughnut } from "react-chartjs-2";
import List_sale_account from './List_sale_account';
import ListSaleDate from './ListSaleDate';
import Navbar2 from '../navPages/Navbar2';

Chart.register(LineElement,BarElement, CategoryScale, RadialLinearScale, LinearScale,ArcElement,PointElement,Tooltip,Legend,Filler);

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

export const Dashboard2 = () => {
const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const[dialogue,setDialogue] = useState()
  const { stockGroups, stockItems, ledgers, groups,sales,totalAmount, totalQunatity, allSalesRecord,showMenu,backgroundColor} = useSelector(state => state.dashboard);
  const {counter} = useSelector(state=>state.counter)
  const [chartData, setChartData] = useState(null);
  const[barChart,setBarChart] = useState(null)
  const[searchName,setSearchName] = useState("")
  const[dates,setDates] = useState([])
  const [from,setFrom] = useState('')
  const[to,setTo] = useState('')
  const [filteredDates, setFilteredDates] = useState([])
  const[doughnut,setDoughnut] = useState([])
 
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

      const allSalesRecords = await res.json(); 

      console.log(allSalesRecords.length);

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
  fetchData(); 
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
            backgroundColor: backgroundColor,
            tension:0.5,
            pointRadius :5
          },
        ],
      });
      setBarChart(
        {
            labels,
        datasets: [
          {
            label: "Total Sales Amount", 
            data: dataValues,
            fill: true,
            borderColor: "rgba(0, 91, 247, 1)",
            backgroundColor: backgroundColor,
            tension:0.5,
            pointRadius :5
          },
        ],
        }
      )
      setDoughnut({
         labels,
        datasets: [
          {
            label: "Total Sales Amount", 
            data: dataValues,
            fill: true,
            borderColor: "rgba(0, 91, 247, 1)",
             backgroundColor: backgroundColor,
            tension:0.5,
            pointRadius :5
          },
        ],
      })
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
   <div>
     <div className={showMenu?"hamburger-menu":"not-hamburger-menu"} onClick={()=>dispatch(setShowMenu(!showMenu))} >
                   <span className='menu-icon'><IoIosMenu /></span> </div> 
                      {
            showMenu &&
    <div className='aside-section' >
        <aside  className='aside'>  
            <div className='profile'> 
                <img src={ArInfo} className='ar-logo'/>
            </div>
           <p className='cn'>AR InfoMatrix Private Limited</p>
            <Navbar2/>
        </aside>
    </div>
}

<div className={showMenu?"ds2-sidebar2-wm":"ds2-sb2-wom"}>
   <header className='ds2-head'>
    <p>Dashboard</p>
    </header>
    <div  className='searches'>
    <p className='search sale-name'><span>Sale Voucher:</span><span><input type="search" value={searchName}  placeholder='Enter Sale Voucher ' onChange={(e)=>{setSearchName(e.target.value)
      }} style={{border:"none", borderRadius:"4px",width:"150px"}}
      onClick={()=>setDialogue("salesName")}
      /></span></p>
    <p className='search sale-date'><span>From:</span><span><input type="date"   value={from}  onClick={()=>setDialogue("salesFrom")} onChange={(e)=>{setFrom(e.target.value)  
    
     setSearchName('')}} style={{border:"none",borderRadius:"4px"}}/></span><span className='to'>&nbsp;&nbsp;&nbsp;To:</span><span><input type="date" value={to}  onClick={()=>setDialogue("saleTo")} onChange={(e)=>{setTo(e.target.value)
   setSearchName('')}}  style={{border:"none", borderRadius:"4px"}}/></span></p>
  </div>
    <div className='ds2-boxes'>
       <div className='dashboard-table  sal d2-sal'>
    <div className='tot'>
      <h2>Total Amount</h2>
      <span className='alert'><RiMoneyRupeeCircleLine /></span>
        <h4 style={{color:"white"}}>{totalAmount}</h4>
    </div>
  </div>
  <div className='dashboard-table counts tg d2-tg' onClick={()=>navigate('/group')}>
    <div className='total groups'>
   <h2>Total Groups</h2>
     <h3>{groups}</h3>
    </div>
  </div>
  <div className='dashboard-table counts tl d2-tl' onClick={()=>navigate('/LedgerList')}>
    <div className='total ledgers'>
       <h2>Total Ledgers</h2>
     <h3>{ledgers}</h3>
    </div>
  </div>
  <div className='dashboard-table counts tsi d2-tsi' onClick={()=>navigate('/stockItem')}>
   <div className='total sold'>
    <h2>Total Stock Items</h2>
     <h3>{stockItems}</h3>
   </div>
   
  </div>
  <div className='dashboard-table counts tsg d2-sg' onClick={()=>navigate('/stockGroup')}>
   <div className='total sg'>
    <h2>Total Stock Groups</h2>
     <h3>{stockGroups}</h3>
   </div>
   </div>
    <div className='dashboard-table counts qs d2-qs'>
    <div className='total sq'>
      <h2>Total Quantity Sold</h2>
      <h3 >{totalQunatity}</h3>
    </div>
    
  </div>
  <div className='dashboard-table counts ta d2-sa'  onClick={()=>navigate('/sales')}>
    <div className='total sa'>
       <h2>Total Sales</h2>
    <h3 >{sales}</h3>
    </div>
  </div>
    </div>
    <div className='sales-dashboard2'>
         <div className='sales-line chart'>
      {chartData ? (
            <>
              <h2 style={{textAlign:"center",color:"black"}}>Sales Line Chart</h2>
            <Line data={chartData} options={options} width={"50%"} height={"18px"} />
            </>
          ) : (
            <p style={{textAlign:"center"}}>No sales data found</p>
          )}
      </div>
        <div className='sales-bar chart'>
      {chartData ? (
            <>
              <h2 style={{textAlign:"center",color:"black"}}>Sales Bar Chart</h2>
            <Bar data={barChart} options={options} width={"50%"}  height={"18px"} />
            </>
          ) : (
            <p style={{textAlign:"center"}}>No sales data found</p>
          )}
      </div>
       <div className='sales-radar chart' >
        <div className='doughnut'>
       {chartData ? (
            <>
              <h2 style={{textAlign:"center",color:"black"}}>Sales Doughnut Chart</h2>
            <Doughnut data={doughnut} options={options}  width={"50%"} height={"50px"}   />
            </>
          ) : (
            <p style={{textAlign:"center"}}>No sales data found</p>
          )}
        </div>
      </div>
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
   </div>
  )
}

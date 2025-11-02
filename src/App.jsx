import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary'
import LedgerList from './components/ledgers/LedgerList'
import LedgersForm from './components/ledgers/LedgersForm'
import Sales from './components/sales/Sales'
import SalesList from './components/sales/SalesList'
import Home from './pages/Home';
import Create from './pages/Create';
import Alter from './pages/Alter';
import StockItemForm from './components/stock_item/StockItemForm';
import StockItemList from './components/stock_item/StockItemList';
import Gstcalci from './components/sales/Gstcalci';
import Stock_group from './components/stock_group/stock_group';
import StockGroupList from './components/stock_group/StockGroupList';
import Groups from './components/groups/groups';
import GroupList from './components/groups/groupList';
import Dashboard from './pages/Dashboard';
import dashboardReducer from "./redux/dashboardSlice";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>404 - Page Not Found</h2>
      <button
        onClick={() => navigate('/')}
        style={{
          backgroundColor: '#2c6fbb',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Go Home
      </button>
    </div>
  );
};

function App() {
    const navigate = useNavigate()
  return (
    <div >
      <div style={{position:"fixed",top:"0",width:"100%",textAlign:"center", backgroundColor:"#2d2d2ddd",display:"flex",justifyContent:"space-evenly",height:"20px"}}>  <button onClick={()=>navigate('/home')}>Home</button>
        <button onClick={()=>navigate('/sales')} >Sales</button>
        <button onClick={()=>navigate('/ledgers')} >Ledgers</button> 
         <button onClick={()=>navigate('/stockItem')} >StockItems</button> 
          <button onClick={()=>navigate('/stockGroup')} >StockGroup</button> 
          <button onClick={()=>navigate('/group')}>Groups</button>
          <button onClick={()=>navigate("/")}>Dashboard</button>
    </div>
         <Routes>
      
        <Route path="/ledgers" element={<ErrorBoundary><LedgerList /></ErrorBoundary>} />
        <Route path="/sales" element={<ErrorBoundary><SalesList /></ErrorBoundary>} />
        <Route path="/sales/new" element={<ErrorBoundary><Sales /></ErrorBoundary>} />
        <Route path="/sales/:name" element={<ErrorBoundary><Sales /></ErrorBoundary>} />
        <Route path="/ledgers/new" element={<ErrorBoundary><LedgersForm /></ErrorBoundary>} />
        <Route path="/ledgers/:name" element={<ErrorBoundary><LedgersForm /></ErrorBoundary>} />
        <Route path="/home" element={<ErrorBoundary><Home/></ErrorBoundary>}/>
        <Route path="/create" element ={<ErrorBoundary><Create/></ErrorBoundary>}/>
        <Route path='/alter' element={<ErrorBoundary><Alter/></ErrorBoundary>}/>
        <Route path='/stockItem/new' element={<ErrorBoundary><StockItemForm/></ErrorBoundary>}/>
        <Route path ='/stockItem/:name' element={<ErrorBoundary><StockItemForm/></ErrorBoundary>}/>
        <Route path='/stockItem' element={<ErrorBoundary><StockItemList/></ErrorBoundary>}/>
        <Route path='/gst' element={<ErrorBoundary><Gstcalci/></ErrorBoundary>}/>
        <Route path ='/stockGroup/new' element ={<ErrorBoundary><Stock_group/></ErrorBoundary>}/>
        <Route path ='/stockGroup/:name' element ={<ErrorBoundary><Stock_group/></ErrorBoundary>}/>
        <Route path = '/stockGroup' element ={<ErrorBoundary><StockGroupList/></ErrorBoundary>}/>
        <Route path='/group/new' element = {<ErrorBoundary><Groups/></ErrorBoundary>}/>
         <Route path='/group/:name' element = {<ErrorBoundary><Groups/></ErrorBoundary>}/>
         <Route path ='/group' element ={<ErrorBoundary><GroupList/></ErrorBoundary>}/>
         <Route path='/' element ={<ErrorBoundary><Dashboard/></ErrorBoundary>}/>
        <Route path="*" element={<ErrorBoundary><NotFound/></ErrorBoundary>} />
        
      </Routes>
      
      
    </div>
  );
}

export default App

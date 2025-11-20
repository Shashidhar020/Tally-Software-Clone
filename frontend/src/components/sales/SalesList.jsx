import React, { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setShowMenu,setBackGroundColor } from "../../redux/dashboardSlice";
import axios from "axios";
import Menu from '../../assets/menu.png'
import Navbar from "../../navPages/Navbar";
import { IoIosMenu } from "react-icons/io";
const SalesList = () => {
  const navigate = useNavigate();
  const [ledgers, setLedgers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
   const [ledgerData, setLedgerData] = useState([]);
   const dispatch = useDispatch();
    const{showMenu,backgroundColor} = useSelector(state => state.dashboard)
  useEffect(() => {
  const fetchSales = async () => {
    try {
      const res = await fetch("https://tally-software-backend-pff6-lypsz6px1.vercel.app/api/sales");
      if (!res.ok) throw new Error("Failed to fetch sales data");
      const data = await res.json();
      // Sort by date (ascending)
      const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
      setLedgers(sorted);
    } catch (error) {
      console.error("Error fetching sales data:", error);
      setLedgers([]);
    }
  };
  fetchSales();
}, []);

  const filteredLedgers = Array.isArray(ledgers) ? ledgers.filter(ledger =>
    ledger.account && ledger.account.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];
  const handleDelete = async (e, name) => {
  e.stopPropagation();
  const confirmDelete = window.confirm(`Delete sale "${name}" permanently?`);
  if (!confirmDelete) return;
  try {
    const res = await axios.delete("https://tally-software-backend-pff6-lypsz6px1.vercel.app/api/sales", {
      data: { account: name }, // body for DELETE request
      headers: { "Content-Type": "application/json" },
    });

    if (res.data.success) {
      // Remove from UI
      const updated = ledgers.filter((l) => l.account !== name);
      setLedgers(updated);
      alert("Sale deleted successfully!");
    } else {
      alert(res.data.message || "Failed to delete sale.");
    }
  } catch (error) {
    console.error("Error deleting sale:", error);
    alert("An error occurred while deleting the sale.");
  }
};

  const handleEdit = (name) => {
    navigate(`/sales/${encodeURIComponent(name)}`);
  };

  return (
    <div>
    <div className="div-container" style={{marginLeft:showMenu?"18%":"0%"}}>
    <div className="ledger-list-container">
        <div className="ledger-list-header">
        <h2 className="li-sl-hd">List of Sales</h2>
        <input type="search"  placeholder="Search the Sale " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  style={{marginLeft:showMenu?"-0px":"100px"}}/>
       <input
  type="color"
  required
  onDoubleClick={(e) => {
    const currentColors = Array.isArray(backgroundColor) ? backgroundColor : [];
    const newColors = [...currentColors, e.target.value];
    dispatch(setBackGroundColor(newColors));
  }}
/>

        <button
          className="add-ledger-btn"
          onClick={() => navigate("/sales/new")}
        >
          Create New Sale Voucher
        </button>
      </div>

      {ledgers.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          No sales records found. Click “Create New Sale Voucher” to add one.
        </p>
      ) : (
        <table className="ledger-table">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Sl. No.</th>
              <th style={{ width: "30%" }}>Name of Account</th>
              <th style={{ width: "15%" }}>Total Quantity</th>
              <th style={{ width: "15%" }}>Total Amount</th>
              <th style ={{width:"15%"}}>Creation Date</th>
              <th style={{ width: "15%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLedgers.map((ledger, index) => (
              <tr key={index}   onClick={() => handleEdit(ledger.account)}>
                <td>{index + 1}</td>
                <td
                  className="ledger-name-link"
                  
                  onClick={() => handleEdit(ledger.account)}
                >
                  {ledger.account}
                
                </td>
                <td>{ledger.totalQuantity || "—"}</td>
                <td>{ledger.totalAmount.toFixed(2)}</td>
                <td>{ledger.date}</td>
                
                <td>
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDelete(e, ledger.account)}
                    value="delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
       
    </div>
    </div>
    <div className={showMenu?"hamburger-menu":"not-hamburger-menu"} onClick={()=>dispatch(setShowMenu(!showMenu))} >
       <span className='menu-icon'><IoIosMenu /></span>  </div> 
      <div>
        {showMenu  &&
        <Navbar/>
        }
      </div>
    </div>
  );
};

export default SalesList

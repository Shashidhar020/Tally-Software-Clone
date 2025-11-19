import React, { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setShowMenu } from "../../redux/dashboardSlice";
import Menu from '../../assets/menu.png'
import Navbar from "../../navPages/Navbar";
import { IoIosMenu } from "react-icons/io";
const StockGroupList = () => {
  const navigate = useNavigate();
  const [stockGroups, setStockGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const{showMenu} = useSelector(state => state.dashboard)
   
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("StockGroups") || "[]");
      setStockGroups(stored);
    } catch (error) {
      console.error("Error parsing sales records from localStorage:", error);
      setStockGroups([]);
    }
  }, []);
 

  const filteredLedgers = Array.isArray(stockGroups) ? stockGroups.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const handleDelete = (e, name) => {
    e.stopPropagation(); 
    if (window.confirm(`Delete ledger "${name}" permanently?`)) {
      const updated = stockGroups.filter((l) => l.name !== name);

      setStockGroups(updated);

      localStorage.setItem("StockGroups", JSON.stringify(updated));

    }

  };


  const handleEdit = (name) => {
    navigate(`/stockGroup/${encodeURIComponent(name)}`);
  };

  return (
    <div>
    <div className="div-container" style={{marginLeft:showMenu?"18%":"0%"}}>
 <div className="ledger-list-container" >
        <div className="ledger-list-header">
        <h2>List of StockGroups</h2>
        <input type="search" placeholder="Search the StockGroup " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{marginLeft:showMenu?"-0px":"100px"}}/>
        <button
          className="add-ledger-btn"
          onClick={() => navigate("/stockGroup/new")}
        >
          Create New StockGroups
        </button>
      </div>

      {stockGroups.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          No stockGroup found. Click “Create New Stock Group” to add one.
        </p>
      ) : (
        <table className="ledger-table">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Sl. No.</th>
              <th style={{ width: "30%" }}>Name of Group</th>
              <th style={{ width: "15%" }}>Under</th>
              <th style={{ width: "15%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLedgers.map((item, index) => (
              <tr key={index}   onClick={() => handleEdit(item.name)}>
                <td>{index + 1}</td>
                <td
                  className="ledger-name-link"
                  
                  onClick={() => handleEdit(item.name)}
                >
                  {item.name}
                
                </td>
                <td>{item.under || "—"}</td>
                
                <td>
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDelete(e, item.name)}
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
       <span className='menu-icon'><IoIosMenu /></span></div> 
      <div>
        {showMenu  &&
        <Navbar/>
        }
      </div>
    </div>
  );
};

export default StockGroupList

import React, { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";

const GroupList = () => {
  const navigate = useNavigate();
  const [stockGroups, setStockGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
   
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("Groups") || "[]");
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

      localStorage.setItem("Groups", JSON.stringify(updated));

    }

  };


  const handleEdit = (name) => {
    navigate(`/group/${encodeURIComponent(name)}`);
  };

  return (
    <div className="ledger-list-container">
        <div className="ledger-list-header">
        <h2>List of StockGroups</h2>
        <input type="search" placeholder="Search the StockGroup " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{marginLeft:"100px"}}/>
        <button
          className="add-ledger-btn"
          onClick={() => navigate("/group/new")}
        >
          Create New Group
        </button>
      </div>

      {stockGroups.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          No Group found. Click “Create New  Group” to add one.
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
  );
};

export default GroupList

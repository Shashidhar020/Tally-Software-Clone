import React, { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";

const StockItemList = () => {
  const navigate = useNavigate();
  const [stockItems, setStockItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
   
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("StockItems") || "[]");
      setStockItems(stored);
    } catch (error) {
      console.error("Error parsing sales records from localStorage:", error);
      setStockItems([]);
    }
  }, []);
 

  const filteredLedgers = Array.isArray(stockItems) ? stockItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const handleDelete = (e, name) => {
    e.stopPropagation(); 
    if (window.confirm(`Delete ledger "${name}" permanently?`)) {
      const updated = stockItems.filter((l) => l.name !== name);

      setStockItems(updated);

      localStorage.setItem("StockItems", JSON.stringify(updated));

    }

  };


  const handleEdit = (name) => {
    navigate(`/stockItem/${encodeURIComponent(name)}`);
  };

  return (
    <div className="ledger-list-container">
        <div className="ledger-list-header">
        <h2>List of StockItems</h2>
        <input type="search" placeholder="Search the StockItem " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{marginLeft:"100px"}}/>
        <button
          className="add-ledger-btn"
          onClick={() => navigate("/stockItem/new")}
        >
          Create New StockItem
        </button>
      </div>

      {stockItems.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          No stockItem found. Click “Create New Stock Item” to add one.
        </p>
      ) : (
        <table className="ledger-table">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Sl. No.</th>
              <th style={{ width: "30%" }}>Name of Item</th>
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

export default StockItemList

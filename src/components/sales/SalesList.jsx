import React, { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";

const SalesList = () => {
  const navigate = useNavigate();
  const [ledgers, setLedgers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
   const [ledgerData, setLedgerData] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("salesRecords") || "[]");  
      setLedgers(stored);
      
    } catch (error) {
      console.error("Error parsing sales records from localStorage:", error);
      setLedgers([]);
    }
  }, []);
 
  const filteredLedgers = Array.isArray(ledgers) ? ledgers.filter(ledger =>
    ledger.account && ledger.account.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const handleDelete = (e, name) => {
    e.stopPropagation(); 
    if (window.confirm(`Delete ledger "${name}" permanently?`)) {
      const updated = ledgers.filter((l) => l.account !== name);

      setLedgers(updated);

      localStorage.setItem("salesRecords", JSON.stringify(updated));

    }

  };


  const handleEdit = (name) => {
    navigate(`/sales/${encodeURIComponent(name)}`);
  };

  return (
    <div className="ledger-list-container">
        <div className="ledger-list-header">
        <h2>List of Sales</h2>
        <input type="search" placeholder="Search the Sale " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{marginLeft:"100px"}}/>
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
  );
};

export default SalesList

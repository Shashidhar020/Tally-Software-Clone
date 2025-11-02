import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LedgerList = () => {
  const navigate = useNavigate();
  const [ledgers, setLedgers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ledgerList")) || [];
    setLedgers(stored);
  }, []);

  
  const filteredLedgers = ledgers.filter(ledger =>
    ledger.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  
  const handleDelete = (name) => {
    if (window.confirm(`Delete ledger "${name}" permanently?`)) {
      const updated = ledgers.filter((l) => l.name !== name);
      setLedgers(updated);
      localStorage.setItem("ledgerList", JSON.stringify(updated));
    }
  };

  
  const handleEdit = (name) => {
    navigate(`/ledgers/${encodeURIComponent(name)}`);

  };

  return (
    <div className="ledger-list-container">
        <div className="ledger-list-header">
        <h2>List of Ledgers</h2>
        <input type="search" placeholder="Search the Ledger" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <button
          className="add-ledger-btn"
          onClick={() => navigate("/ledgers/new")}
        >
          Create New Ledger
        </button>
      </div>

      {ledgers.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          No ledgers found. Click “Create New Ledger” to add one.
        </p>
      ) : (
        <table className="ledger-table">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Sl. No.</th>
              <th style={{ width: "30%" }}>Name of Ledger</th>
              <th style={{ width: "25%" }}>Under</th>
              <th style={{ width: "15%" }}>Opening Balance</th>
              <th style={{ width: "10%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLedgers.map((ledger, index) => (
              <tr key={index}   onClick={() => handleEdit(ledger.name)}>
                <td>{index + 1}</td>
                <td
                  className="ledger-name-link"
                  
                  
                >
                  {ledger.name}
                
                </td>
                <td>{ledger.under || "—"}</td>
                <td>{ledger.openingBalance }</td>
                
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(ledger.name)}
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

export default LedgerList

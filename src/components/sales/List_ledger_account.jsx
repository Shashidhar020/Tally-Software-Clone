import React from "react";
import { useNavigate } from "react-router-dom";
function List_ledger_account({ accounts, onClose, onSelect }) {

  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "absolute",
        top: "18%",
        left: "1%",
        background: "#eaf6ff",
        border: "1px solid #000000ff",
        boxShadow: "20px 20px 20px rgba(171, 0, 0, 0.2)",
        borderRadius: "5px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          marginBottom: "1px",
          width: "330px",
          height: "50px",
          borderBottom: "1px solid #6e6d6dff",
          backgroundColor: "#b1e8e6ff",
        }}
      >
        <p
          onClick={onClose}
          style={{
            marginLeft: "300px",
            marginBottom: "1px",
            marginTop: "1px",
            cursor: "pointer",
          }}
        >
          ✖
        </p>
        <h3 style={{ display: "inline-block", marginTop: "2px" }}>
          List of Ledger Account
        </h3>
        <button type="text"  className="ledger-create"  onClick={()=>navigate("/")}>Create</button>
      </div>
      <div>
        {accounts && accounts.length > 0 ?<>{accounts.map((account, i) => (
          <div
            style={{ cursor: "pointer", position: "relative",padding:"5px"}}
            onClick={() => onSelect(account.name)}
            key={i}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "yellow")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            {account.name}
          </div>
        ))}</>:<>{
          <div
            style={{ position: "relative",padding:"5px"}}
          >
            <span>To Create the Ledgers Click on Create</span>
          </div>
        }</>}
      </div>
    </div>
  );
}

export default List_ledger_account;

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ListSaleDate({ accounts, onClose, onSelect }) {
  const{showMenu} = useSelector(state=>state.dashboard)
  const accountss = [...accounts].sort((a,b)=>new Date(a.date)- new Date(b.date))


  const navigate = useNavigate();
  return (
    <div
    className="list-sale-date"
      style={{
        position: "absolute",
        top: "18%",
        left: showMenu?"70%": "60%",
         background: "#eaf6ff",
        border: "1px solid #000000ff",
        boxShadow: "20px 20px 20px rgba(33, 33, 33, 1)",
        borderRadius: "5px",
        zIndex: 1000,
        
      }}
    >
      <div
        style={{
          marginBottom: "1px",
          width: "200px",
          height: "50px",
          borderBottom: "1px solid #6e6d6dff",
          backgroundColor: "#00000038",
        }}
      >
        <p
          onClick={onClose}
          style={{
            marginLeft: "180px",
            marginBottom: "1px",
            marginTop: "1px",
            cursor: "pointer",
            color:"black"
          }}
        >
          ✖
        </p>
        <h3 style={{ display: "inline-block", marginTop: "2px",color:"black" }}>
          List of Sale Date
        </h3>
        <button type="text"  className="ledger-create"  onClick={()=>navigate("/sales/new")}>Create</button>
      </div>
      <div>
        {accountss && accountss.length > 0 ?<>{accountss.map((account, i) => (
          <div
            style={{ cursor: "pointer", position: "relative",padding:"5px",color:"black"}}
            onClick={() => onSelect(account.date)}
            key={i}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "yellow")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            {account.date}
          </div>
        ))}</>:<>{
          <div
            style={{ position: "relative",padding:"5px"}}
          >
            <span>To Create the Sales Click on Create</span>
          </div>
        }</>}
      </div>
    </div>
  );
}

export default ListSaleDate;

import React from "react";

const States = ({ title, items, onClose, onSelect, variant}) => {
  const isDropdown = variant === "dropdown";
  const isSupply = title ==="Type of Supply";
  const isState = title ==="List of States";   
  return (
    <div
      style={{
        position:"absolute",
       top: isDropdown ?  isSupply? "77%":isState?"40%":  "40%" : "32%",
        left: isDropdown? isSupply  ? "52%"  : isState?"65%": "40%"  : "16%",
        width: isDropdown ? "280px" : "250px",
        background: "#eaf6ff",
        border: "1px solid #000000ff",
        boxShadow: "20px 20px 20px rgba(171, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >
      
      {isDropdown && (
        <div
          style={{
            background: "#2c6fbb",
            color: "white",
            padding: "5px 10px",
            display: "flex",
            justifyContent: "space-between",
            
          }}
        >
          <span>{title}</span>
          <span style={{ cursor: "pointer" }} onClick={onClose}>
            ✖
          </span>
        </div>
      )}
 
      {!isDropdown && (
        <div
          style={{ textAlign: "right", padding: "5px 10px", fontSize: "12px" }}
        >
          Create
        </div>
      )}

      
      <div
        style={{
          padding: "10px",
          background: "#e9f0f6ff",
          maxHeight: "200px", // limit height
          overflowY: "auto",  // enable vertical scrolling
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              padding: "5px",
              background:
                i === 0 && isDropdown
                  ? "#ffffffff"
                  : i === 0 && !isDropdown
                  ? "#d3610fff"
                  : "transparent",
              marginBottom: "2px",
              cursor: "pointer",
            }}
            onClick={() => onSelect(item)}
          
          
            onMouseEnter={(e) => e.currentTarget.style.background = "yellow"}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            className="item-div"
           
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default States

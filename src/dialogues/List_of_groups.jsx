import React from "react";

const List_of_groups = ({ title, items, onClose, onSelect, variant }) => {
  const isDropdown = variant === "dropdown";

  const dropdownPositions = {
    "List of Groups": { top: "12%", left: "43%" },
    "Type of Ledger": { top: "24%", left: "43%" },
    "List of Actions": { top: "375px", left: "52%" },
    "List of Action": { top: "450px", left: "52%" },
    "Type of Supply": { top: "92%", left: "43%" },
    "Duty / Tax Type": { top: "46%", left: "43%" },
    "Rounding Methods": { top: "28%", left: "43%" },
    "List of Options": { top: "46%", left: "43%" },
    "Method of Calculation": {top :"50%",left:"43%"},
    "Applicability": {top :"50%",left:"43%"},
   "HSN List of Action": {top :"57%",left:"43%"},
   "GST List of Action":{top:"75%",left:"43%"},
   "Registration Types" :{top:"65%",left:"65%"},
   "Tax Type":{top :"25%",left:"43%"},
    "Options":{top :"26%",left:"43%"},
    "Method of Calculations":{top :"28%",left:"43%"},
  };

  const defaultDropdownPosition = { top: "40%", left: "40%" };
  const nonDropdownPosition = { top: "32%", left: "16%" };

  const getPosition = () => {
    return isDropdown ? (dropdownPositions[title] || defaultDropdownPosition) : nonDropdownPosition;
  };

  const pos = getPosition();

  return (
    <div
      style={{
        position:"absolute",
       top: pos.top,
        left: pos.left,
        width: isDropdown ? "180px" : "250px",
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
              marginTop:"-7px"
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

export default List_of_groups

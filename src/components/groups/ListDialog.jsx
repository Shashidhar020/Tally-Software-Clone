import React from "react";

const ListDialog = ({ title, items, onClose, onSelect, variant}) => {
  const isDropdown = variant === "dropdown";
  const isListofgroups = title ==="List of Groups";
  const isUnits = title ==="Units";
  const isListActions = title ==="HSN List of Action";
  const isSupply = title ==="Type of Supply";
  const isAction = title==="GST List of Action";
  const isapplicability = title ==="Applicability";
  const istaxabilitytype = title ==="Taxability Types"
  const isnatureType = title === "Nature of Groups"
  const isMethods =  title === "List of Methods"
  return (
    <div
      style={{
        position:"absolute",
       top: isDropdown ? isListofgroups  ? "5%"  : isUnits  ? "39%"  : isListActions  ? "43%"  : isAction  ? "62%" : isSupply? "77%":  isapplicability?"20%":istaxabilitytype?"45%": isnatureType?"14%":isMethods?"30%":"40%" : "32%",
        left: isDropdown? isListofgroups  ? "49%"  : isUnits  ? "5%"  : isListActions  ? "49%"   : isAction  ? "49%"    : isSupply  ? "49%":  isapplicability?"49%":istaxabilitytype?"49%":isnatureType?"49%":isMethods?"49%":"40%"  : "16%",
        width: isDropdown ? "280px" :isnatureType?"10%": "250px",
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
          
          maxHeight: "200px",
          overflowY: "auto",  
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
           
              cursor: "pointer",
              marginTop:"-5px"
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

export default ListDialog;

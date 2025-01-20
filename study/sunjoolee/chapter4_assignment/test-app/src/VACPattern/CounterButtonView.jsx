import React from "react";

// View
const CounterButtonView = ({
  label,
  onIncCount,
  onDecCount,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: '5px',
        justifyContent: "center",
        alignItems: "center",
      }}>
      <button onClick={onDecCount}>-</button>
      <p>{label}</p>
      <button onClick={onIncCount}>+</button>
    </div>
  );
};
export default CounterButtonView;

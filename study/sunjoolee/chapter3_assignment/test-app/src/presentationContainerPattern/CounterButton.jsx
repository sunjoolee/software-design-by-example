import { useState } from "react";

import React from "react";
import CounterButtonView from "./CounterButtonView";

// Container
const CounterButton = () => {
  const [count, setCount] = useState(0);
  const onIncCount = () => setCount((prev) => prev + 1);
  const onDecCount = () => setCount((prev) => prev - 1);

  return (
    <CounterButtonView
      label={count.toString()}
      onIncCount={onIncCount}
      onDecCount={onDecCount}
    />
  );
};
export default CounterButton;

import { useState } from "react";

import React from "react";
import { decrementCount, incrementCount } from "./CounterButtonAction";
import CounterButtonView from "./CounterButtonView";

// Container
const CounterButton = () => {
  const [count, setCount] = useState(0);
  const onIncCount = () => setCount((prev) => incrementCount(prev));
  const onDecCount = () => setCount((prev) => decrementCount(prev));

  return (
    <CounterButtonView
      label={count.toString()}
      onIncCount={onIncCount}
      onDecCount={onDecCount}
    />
  );
};
export default CounterButton;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../redux/reducers/counterSlice";

const Index = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return <div></div>;
};

export default Index;

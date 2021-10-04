import { createStore } from "redux";
import Result from "../models/results";

const INITIAL_STATE = {
  last: 1,
  result: {
    sorteio: 1,
    numeros: [],
  },
};

const reducer = (state: any = INITIAL_STATE, action: any) => {
  if (action.type === "SET_LAST") {
    return { ...state, last: action.newLast };
  }
  if (action.type === "SET_RESULT") {
    return { ...state, result: action.newResult };
  }
  return state;
};

const store = createStore(reducer);

export const setLast = (newLast: number) => {
  return {
    type: "SET_LAST",
    newLast,
  };
};

export const setResult = (newResult: Result) => {
  return {
    type: "SET_RESULT",
    newResult,
  };
};

export default store;

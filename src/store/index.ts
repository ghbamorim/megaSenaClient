import { createStore } from "redux";
import Result from "../models/results";

export const initialResult = {
  sorteio: 1,
  numeros: [],
};

const INITIAL_STATE = {
  log: "",
  userNumbers: initialResult,
  selectedResult: initialResult,
};

const reducer = (state: any = INITIAL_STATE, action: any) => {
  if (action.type === "SET_USERNUMBERS") {
    return { ...state, userNumbers: action.newResult as Result };
  }
  if (action.type === "SET_SELECTED") {
    return { ...state, selectedResult: action.newSelectedResult as Result };
  }
  if (action.type === "SET_LOG") {
    return { ...state, log: action.newLog };
  }
  return state;
};

const store = createStore(reducer);

export const setSelectedResult = (newSelectedResult: Result) => {
  return {
    type: "SET_SELECTED",
    newSelectedResult,
  };
};

export const setResult = (newResult: Result) => {
  return {
    type: "SET_USERNUMBERS",
    newResult,
  };
};

export default store;

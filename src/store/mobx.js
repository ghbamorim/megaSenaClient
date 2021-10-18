import React from "react";
import { useLocalStore, useObserver } from "mobx-react-lite";

export const StoreContext = React.createContext();

export const initialResult = {
  sorteio: 1,
  numeros: [],
};

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    last: 1,
    log: "",
    userNumbers: initialResult,
    selectedResult: initialResult,
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

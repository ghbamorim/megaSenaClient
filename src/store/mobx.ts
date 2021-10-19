import { makeObservable, observable } from "mobx";

const numberArray: number[] = [];

export const initialResult = {
  sorteio: 1,
  numeros: numberArray,
};

export class StoreImpl {
  last = 1;
  log = "";
  userNumbers = initialResult;
  selectedResult = initialResult;
  constructor() {
    makeObservable(this, {
      last: observable,
      log: observable,
      userNumbers: observable,
      selectedResult: observable,
    });
  }
}

export const TodoStore = new StoreImpl();

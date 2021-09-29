import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class CardController {
  rows: number[] = [];
  arr: number[][];
  getLast = async () => {
    const api = axios.create({
      baseURL: "https://megasenaapi.herokuapp.com",
    });

    const result: number[] = [];
    try {
      const response = await api.get("/last");

      switch (response.status) {
        case 202:
          toast(response.statusText);
          break;

        case 200:
          result.push(parseInt(response.data.coluna_1));
          result.push(parseInt(response.data.coluna_2));
          result.push(parseInt(response.data.coluna_3));
          result.push(parseInt(response.data.coluna_4));
          result.push(parseInt(response.data.coluna_5));
          result.push(parseInt(response.data.coluna_6));
          break;
      }

      return result;
    } catch (error: any) {
      const msg = (error as Error).message;
      toast(msg);
      return result;
    }
  };

  sliceIntoChunks = (arr: any[], chunkSize: number) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };

  isSelected = (array: number[], n: number) => {
    const found = array.indexOf(n) !== -1;
    return found;
  };
  constructor() {
    for (let i = 1; i <= 60; i++) {
      this.rows.push(i);
    }
    this.arr = this.sliceIntoChunks(this.rows, 10);
  }
}

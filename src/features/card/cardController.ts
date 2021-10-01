import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Result from "../../models/results";
import Last from "../last/last";
import SelectResult from "../selectResult/selectResult";

export default class CardController {
  route: string = "/last";
  numbers: number[][];
  getNumbers = async () => {
    const api = axios.create({
      baseURL: "https://megasenaapi.herokuapp.com",
    });

    const result: Result = new Result();
    try {
      const response = await api.get(this.route);

      switch (response.status) {
        case 200:
          result.sorteio = response.data.concurso;
          result.data = response.data.data_do_sorteio;
          result.numeros.push(parseInt(response.data.coluna_1));
          result.numeros.push(parseInt(response.data.coluna_2));
          result.numeros.push(parseInt(response.data.coluna_3));
          result.numeros.push(parseInt(response.data.coluna_4));
          result.numeros.push(parseInt(response.data.coluna_5));
          result.numeros.push(parseInt(response.data.coluna_6));
          break;
        case 202:
          toast("Atualizando dados, aguarde");
          break;
      }
    } catch (error: any) {
      const msg = (error as Error).message;
      toast(msg);
    }
    return result;
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

  constructor(route: string) {
    this.route = route;
    const rows: number[] = [];
    for (let i = 1; i <= 60; i++) {
      rows.push(i);
    }
    this.numbers = this.sliceIntoChunks(rows, 10);
  }
}

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Result from "../../models/results";

export default class CardController {
  route: string = "/last";

  api = axios.create({
    baseURL: "https://megasenaapi.herokuapp.com",
    //baseURL: "http://localhost:9000",
  });

  getNumbers = async (): Promise<Result> => {
    const result: Result = new Result();
    try {
      const response = await this.api.get(this.route);

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

  getStats = async (userNumbers: number[]): Promise<Result[]> => {
    let resultArray: Result[] = [];
    try {
      const response = await this.api.post("/stats", { results: userNumbers });

      switch (response.status) {
        case 200:
          resultArray = response.data.map((item: any) => {
            const result: Result = new Result();
            result.sorteio = item.concurso;
            result.data = item.data_do_sorteio;
            result.numeros.push(parseInt(item.coluna_1));
            result.numeros.push(parseInt(item.coluna_2));
            result.numeros.push(parseInt(item.coluna_3));
            result.numeros.push(parseInt(item.coluna_4));
            result.numeros.push(parseInt(item.coluna_5));
            result.numeros.push(parseInt(item.coluna_6));
            return result;
          });
          break;

        case 202:
          toast("Atualizando dados, aguarde");
          break;
      }
    } catch (error: any) {
      const msg = (error as Error).message;
      toast(msg);
    }
    return resultArray;
  };

  constructor(route: string) {
    this.route = route;
  }
}

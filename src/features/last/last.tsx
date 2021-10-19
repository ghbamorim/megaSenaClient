import React from "react";
import Result from "../../models/results";
import { TodoStore } from "../../store/mobx";
import Card from "../card/card";
import CardController from "../card/cardController";

const Last = () => {
  const store = TodoStore;
  const [result, setResult] = React.useState<Result>({
    sorteio: 0,
    numeros: [],
  });

  const fetchResults = async () => {
    const cardController = new CardController("/last");
    const results = await cardController.getNumbers();
    store.last = results.sorteio;
    setResult(results);
  };

  React.useEffect(() => {
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Card result={result}></Card>;
};

export default Last;

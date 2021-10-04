import Card from "../card/card";
import CardController from "../card/cardController";
import React from "react";
import Result from "../../models/results";
import { setLast } from "../../store";
import { useDispatch } from "react-redux";

const Last = () => {
  const dispatch = useDispatch();
  const [result, setResult] = React.useState<Result>({
    sorteio: 0,
    numeros: [],
  });

  const fetchResults = async () => {
    const cardController = new CardController("/last");
    const results = await cardController.getNumbers();
    dispatch(setLast(results.sorteio));
    setResult(results);
  };

  React.useEffect(() => {
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Card result={result}></Card>;
};

export default Last;

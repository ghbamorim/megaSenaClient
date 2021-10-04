import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { toast } from "react-toastify";
import Result from "../../models/results";
import Card from "../card/card";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  select: {
    paddingTop: 30,
  },
}));

const TryPage = () => {
  const classes = useStyles();
  const [result, setResult] = React.useState<Result>({
    sorteio: 0,
    numeros: [],
  });

  const handleClick = async (event: any): Promise<void> => {
    const newNumbers = result.numeros;
    const newNumber = Number(event.target.textContent);

    const index = newNumbers.indexOf(newNumber);

    if (index !== -1) {
      newNumbers.splice(index, 1);
    } else if (newNumbers.length === 6) {
      toast("Selecione apenas 6 números");
      return;
    } else {
      newNumbers.push(newNumber);
    }

    const newResult = { ...result, numeros: newNumbers };
    setResult(newResult);
  };

  /*const fetchResults = async () => {
    const cardController = new CardController("/last");
    const results = await cardController.getNumbers();
    setLast(results.sorteio);
    setResult(results);
  };

  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

  return (
    <div className={classes.select}>
      <Card result={result} onClick={handleClick}></Card>
    </div>
  );
};

export default TryPage;

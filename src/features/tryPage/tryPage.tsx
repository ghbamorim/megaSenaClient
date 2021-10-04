import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import Card from "../card/card";
import CardController from "../card/cardController";

const useStyles = makeStyles((theme) => ({
  select: {
    textAlign: "left",
    paddingTop: 30,
  },
  appHead: {
    backgroundColor: "#FDFDD7",
    color: "#DF977E",
  },
}));

const TryPage = () => {
  const classes = useStyles();
  const [concurso, setConcurso] = React.useState(1);
  const [last, setLast] = React.useState(1);

  const handleChange = (event: any) => {
    setConcurso(event.target.value);
  };

  const fetchResults = async () => {
    const cardController = new CardController("/last");
    const results = await cardController.getNumbers();
    setLast(results.sorteio);
    setConcurso(results.sorteio);
  };

  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allPrizes = [];
  for (let i = last; i >= 1; i--) {
    allPrizes.push(i);
  }

  return (
    <React.Fragment>
      <Card route={`/results/${concurso}`}></Card>
    </React.Fragment>
  );
};

export default TryPage;

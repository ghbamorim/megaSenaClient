import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { toast } from "react-toastify";
import Card from "../card/card";
import CardController from "../card/cardController";
import { connect } from "react-redux";
import { setLast, setResult } from "../../store";

const useStyles = makeStyles((theme) => ({
  select: {
    paddingTop: 10,
  },
}));

const TryPage = (props: any) => {
  const classes = useStyles();
  const dispatch = props.dispatch;
  const last = props.last;
  const userNumbers = props.userNumbers;

  const fetchResults = async () => {
    if (last === 1) {
      const cardController = new CardController("/last");
      const results = await cardController.getNumbers();
      const newResult = { ...userNumbers, sorteio: ++results.sorteio };
      dispatch(setLast(results.sorteio));
      dispatch(setResult(newResult));
    }
  };

  React.useEffect(() => {
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async (event: any): Promise<void> => {
    const newNumbers = userNumbers.numeros;
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

    const newResult = { ...userNumbers, numeros: newNumbers };
    dispatch(setResult(newResult));
  };

  return (
    <div className={classes.select}>
      <Card result={userNumbers} onClick={handleClick}></Card>
    </div>
  );
};

export default connect((state) => ({
  last: (state as any).last,
  userNumbers: (state as any).userNumbers,
}))(TryPage);

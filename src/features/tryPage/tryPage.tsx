import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { toast } from "react-toastify";
import Card from "../card/card";
import CardController from "../card/cardController";
import { connect } from "react-redux";
import { setLast, setResult, setLog } from "../../store";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  select: {
    paddingTop: 10,
  },
  button: {
    width: 100,
  },
  textDiv: {
    paddingTop: 10,
    textAlign: "left",
  },
  textArea: {
    width: 1000,
    height: 400,
  },
}));

const TryPage = (props: any) => {
  const classes = useStyles();
  const dispatch = props.dispatch;
  const last: number = props.last;
  const userNumbers = props.userNumbers;
  const log = props.log;

  const fetchResults = async () => {
    if (last === 1) {
      const cardController = new CardController("/last");
      const results = await cardController.getNumbers();
      dispatch(setLast(results.sorteio));
    }
    const newResult = { ...userNumbers, sorteio: Number(last) + 1 };
    dispatch(setResult(newResult));
  };

  const fetchStats = async () => {
    let newLog = "";
    if (userNumbers.numeros.length > 0) {
      const cardController = new CardController("/stats");
      const results = await cardController.getStats(userNumbers.numeros);

      newLog = `Total de concursos: ${results.length}`;
      results.map((item) => {
        newLog = newLog + `\n concurso: ${item.sorteio}`;
        return null;
      });
    }

    dispatch(setLog(newLog));
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
    if (newNumbers.length === 0) {
      dispatch(setLog(""));
    }
    fetchStats();
  };

  const handleClear = async (event: any): Promise<void> => {
    dispatch(setLog(""));
    dispatch(setResult({ ...userNumbers, numeros: [] }));
  };

  return (
    <React.Fragment>
      <div className={classes.select}>
        <Card result={userNumbers} onClick={handleClick}></Card>
        <Grid container spacing={1}>
          <Grid item xs={1}>
            <button onClick={handleClear} className={classes.button}>
              Limpar
            </button>
          </Grid>
        </Grid>
      </div>
      <div className={classes.textDiv}>
        <textarea
          className={classes.textArea}
          value={log}
          readOnly={true}
        ></textarea>
      </div>
    </React.Fragment>
  );
};

export default connect((state) => ({
  last: (state as any).last,
  userNumbers: (state as any).userNumbers,
  log: (state as any).log,
}))(TryPage);

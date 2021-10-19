import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { toast } from "react-toastify";
import { TodoStore } from "../../store/mobx";
import Card from "../card/card";
import CardController from "../card/cardController";
import { observer } from "mobx-react";

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
    borderStyle: "solid",
    position: "relative",
    height: 400,
  },
  textArea: {
    top: "1%",
    left: "1%",
    bottom: "1%",
    position: "absolute",
    width: "96%",
  },
}));

const TryPage = observer(() => {
  const store = TodoStore;
  const classes = useStyles();
  const userNumbers = store.userNumbers;

  const fetchResults = async () => {
    if (userNumbers.sorteio === 1) {
      const cardController = new CardController("/last");
      const results = await cardController.getNumbers();
      store.last = results.sorteio;
      const newResult = {
        ...userNumbers,
        sorteio: Number(results.sorteio) + 1,
      };
      store.userNumbers = newResult;
    }
  };

  const fetchStats = async () => {
    let newLog = "";
    if (userNumbers.numeros.length > 0) {
      const cardController = new CardController("/stats");
      const results = await cardController.getStats(userNumbers.numeros);

      newLog = `Total de concursos: ${results.length}`;
      results.map((item) => {
        newLog =
          newLog +
          `\n concurso: ${item.sorteio}  [${item.numeros[0]}] [${item.numeros[1]}] [${item.numeros[2]}] [${item.numeros[3]}] [${item.numeros[4]}] [${item.numeros[5]}]`;
        return null;
      });
    }
    store.log = newLog;
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
    store.userNumbers = newResult;

    if (newNumbers.length === 0) {
      store.log = "";
    }
    fetchStats();
  };

  const handleClear = async (event: any): Promise<void> => {
    store.log = "";
    store.userNumbers = { ...userNumbers, numeros: [] };
  };

  return (
    <React.Fragment>
      <div className={classes.select}>
        <Card result={store.userNumbers} onClick={handleClick}></Card>
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
          value={store.log}
          readOnly={true}
        />
      </div>
    </React.Fragment>
  );
});

export default TryPage;

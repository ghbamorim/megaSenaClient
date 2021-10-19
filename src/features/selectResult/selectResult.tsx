import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import Card from "../card/card";
import CardController from "../card/cardController";
import { initialResult, TodoStore } from "../../store/mobx";
import { observer } from "mobx-react";

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

const SelectResult = observer(() => {
  const classes = useStyles();
  const store = TodoStore;
  const last = store.last;

  const handleChange = async (event: any) => {
    const cardController = new CardController(`/results/${event.target.value}`);
    const results = await cardController.getNumbers();
    store.selectedResult = results as any;
  };

  const fetchResults = async () => {
    if (last === 1 || store.selectedResult === initialResult) {
      const cardController = new CardController("/last");
      const results = await cardController.getNumbers();
      store.last = results.sorteio;
      store.selectedResult = results as any;
    }
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
      <div className={classes.select}>
        <InputLabel
          id="demo-simple-select-standard-label"
          className={classes.appHead}
        >
          Selecione o consurso
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={store.selectedResult.sorteio}
          onChange={handleChange}
          label="Concurso"
          className={classes.appHead}
        >
          <MenuItem value="" key={0}>
            <em>-</em>
          </MenuItem>
          {allPrizes.map((i) => (
            <MenuItem value={i} key={i}>
              {i}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Card result={store.selectedResult}></Card>
    </React.Fragment>
  );
});

export default SelectResult;

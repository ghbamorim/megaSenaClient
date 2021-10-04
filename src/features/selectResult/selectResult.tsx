import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import Card from "../card/card";
import CardController from "../card/cardController";
import Result from "../../models/results";
import { connect } from "react-redux";
import { setLast, setSelectedResult } from "../../store";

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

const SelectResult = (props: any) => {
  const classes = useStyles();
  const last = props.last;
  const selectedResult = props.selectedResult;
  const dispatch = props.dispatch;

  const handleChange = async (event: any) => {
    const cardController = new CardController(`/results/${event.target.value}`);
    const results = await cardController.getNumbers();
    dispatch(setSelectedResult(results));
  };

  const fetchResults = async () => {
    if (last === 1) {
      const cardController = new CardController("/last");
      const results = await cardController.getNumbers();
      dispatch(setLast(results.sorteio));
      dispatch(setSelectedResult(results));
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
          value={selectedResult.sorteio}
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
      <Card result={selectedResult}></Card>
    </React.Fragment>
  );
};

export default connect((state) => ({
  last: (state as any).last,
  selectedResult: (state as any).selectedResult,
}))(SelectResult);

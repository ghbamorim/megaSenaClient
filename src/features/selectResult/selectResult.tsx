import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import Card from "../card/card";
import CardController from "../card/cardController";

const useStyles = makeStyles((theme) => ({
  alignLeft: {
    textAlign: "left",
  },
}));

const SelectResult = () => {
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
      <div className={classes.alignLeft}>
        <InputLabel id="demo-simple-select-standard-label">Consurso</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={concurso}
          onChange={handleChange}
          label="Age"
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
      <Card route={`/results/${concurso}`}></Card>
    </React.Fragment>
  );
};

export default SelectResult;

import React from "react";
import Card from "../card/card";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const SelectResult = () => {
  const [concurso, setConcurso] = React.useState(2410);

  const handleChange = (event: any) => {
    setConcurso(event.target.value);
  };

  return (
    <React.Fragment>
      <InputLabel id="demo-simple-select-standard-label">Consurso</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={concurso}
        onChange={handleChange}
        label="Age"
      >
        <MenuItem value="">
          <em>0</em>
        </MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
      </Select>
      <Card route={`/results/${concurso}`}></Card>
    </React.Fragment>
  );
};

export default SelectResult;

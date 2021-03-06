import Grid from "@material-ui/core/Grid";
import React from "react";
import "./App.css";

interface IRowProps {
  startNumber: number;
  endNumber: number;
}

const Row: React.FC<IRowProps> = ({ startNumber, endNumber }: IRowProps) => {
  const cols: number[] = [];
  for (let i = 1; i <= 10; i++) {
    cols.push(i + endNumber);
  }

  return (
    <React.Fragment>
      {cols.map((i) => {
        return (
          <Grid item xs={1}>
            <div className="App">
              <p>| {i} |</p>
            </div>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default Row;

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Result from "../../models/results";
import UniqueId from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  border: {
    border: "2px solid",
  },
  selectedNumber: {
    border: "2px solid black",
    borderRadius: "55px",
  },
}));

interface ICard {
  onClick?: (event: any) => Promise<void>;
  result: Result;
}

const Card: React.FC<ICard> = ({ result, onClick }: ICard) => {
  const classes = useStyles();

  const tempNumbers: number[] = [];

  const sliceIntoCols = (arr: any[], chunkSize: number) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };

  const isSelected = (array: number[], n: number) => {
    const found = array.indexOf(n) !== -1;
    return found;
  };

  for (let i = 1; i <= 60; i++) {
    tempNumbers.push(i);
  }
  const numbers: number[][] = sliceIntoCols(tempNumbers, 10);

  return (
    <React.Fragment>
      <div style={{ textAlign: "left" }}>
        <p>
          {result.sorteio > 0 && `Consurso número: ${result.sorteio}`}
          {result.data && ` - ${result.data}`}
        </p>
      </div>

      {numbers.map((chunck: any) => {
        return (
          <Grid
            container
            spacing={1}
            key={UniqueId.getInstance().getUniqueId()}
          >
            {chunck.map((item: number) => {
              return (
                <Grid
                  item
                  xs={1}
                  className={classes.border}
                  key={UniqueId.getInstance().getUniqueId()}
                >
                  <div
                    onClick={onClick}
                    className={
                      isSelected(result.numeros, item)
                        ? classes.selectedNumber
                        : ""
                    }
                  >
                    <p>{item}</p>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default Card;

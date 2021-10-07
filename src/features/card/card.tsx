import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Result from "../../models/results";
import UniqueId from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  cell: {
    border: "2px solid",
    padding: "0px",
    textAlign: "center",
    backgroundColor: "#FDFDD7",
    color: "#DF977E",
    fontWeight: 1000,
    lineHeight: 0,
  },
  selectedNumber: {
    border: "2px solid black",
    borderRadius: "55px",
  },
  unSelectedNumber: {
    border: "2px solid #FDFDD7",
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

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {numbers.map((chunck: any) => {
              return (
                <TableRow key={UniqueId.getInstance().getUniqueId()}>
                  {chunck.map((item: number) => {
                    return (
                      <TableCell
                        component="th"
                        scope="row"
                        onClick={onClick}
                        key={item}
                        className={classes.cell}
                      >
                        <div
                          className={
                            isSelected(result.numeros, item)
                              ? classes.selectedNumber
                              : classes.unSelectedNumber
                          }
                        >
                          <p>{item}</p>
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/*numbers.map((chunck: any) => {
        return (
          <Grid
            container
            spacing={1}
            key={UniqueId.getInstance().getUniqueId()}
          >
            {chunck.map((item: number) => {
              return (
                <Grid
                  onClick={onClick}
                  item
                  xs={1}
                  className={classes.border}
                  key={UniqueId.getInstance().getUniqueId()}
                >
                  <div
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
      })*/}
    </React.Fragment>
  );
};

export default Card;

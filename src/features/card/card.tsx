import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Result from "../../models/results";
import UniqueId from "../../utils/utils";
import CardController from "./cardController";

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
  route: string;
}

const Card: React.FC<ICard> = ({ route }: ICard) => {
  const classes = useStyles();
  const [last, setLast] = useState<Result>({ sorteio: 0, numeros: [] });

  const cardController = new CardController(route);

  const fetchResults = async () => {
    const results = await cardController.getNumbers();
    setLast(results);
  };

  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  return (
    <React.Fragment>
      <div style={{ textAlign: "left" }}>
        <p>{`Consurso número: ${last.sorteio} - ${last.data}`}</p>
      </div>
      {cardController.numbers.map((chunck: any) => {
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
                    className={
                      cardController.isSelected(last.numeros, item)
                        ? classes.selectedNumber
                        : ""
                    }
                  >
                    <p> [{item}] </p>
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

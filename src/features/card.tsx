import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import UniqueId from "../utils/utils";
import CardController from "./cardController";

const useStyles = makeStyles((theme) => ({
  App: {
    textAlign: "center",
  },

  AppHeader: {
    backgroundColor: "#FDFDD7",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "#DF977E",
  },
  border: {
    border: "2px solid",
  },
  selectedNumber: {
    border: "2px solid black",
    borderRadius: "55px",
  },
}));

const Card = () => {
  const classes = useStyles();
  const [last, setLast] = useState<number[]>([]);

  const cardController = new CardController();

  const fetchResults = async () => {
    const results = await cardController.getLast();
    setLast(results);
  };

  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {cardController.arr.map((chunck: any) => {
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
                      cardController.isSelected(last, item)
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

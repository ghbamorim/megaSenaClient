import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import UniqueId from "./utils/utils";

const getLast = async () => {
  const api = axios.create({
    baseURL: "https://megasenaapi.herokuapp.com",
  });

  const result: number[] = [];
  try {
    const response = await api.get("/last");

    switch (response.status) {
      case 202:
        toast(response.statusText);
        break;

      case 200:
        result.push(parseInt(response.data.coluna_1));
        result.push(parseInt(response.data.coluna_2));
        result.push(parseInt(response.data.coluna_3));
        result.push(parseInt(response.data.coluna_4));
        result.push(parseInt(response.data.coluna_5));
        result.push(parseInt(response.data.coluna_6));
        break;
    }

    return result;
  } catch (error: any) {
    const msg = (error as Error).message;
    toast(msg);
    return result;
  }
};

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

function App() {
  const classes = useStyles();
  const [last, setLast] = useState<number[]>([]);

  const fetchResults = async () => {
    const results = await getLast();
    setLast(results);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const rows: number[] = [];
  for (let i = 1; i <= 60; i++) {
    rows.push(i);
  }

  const isSelected = (n: number) => {
    const found = last.indexOf(n) !== -1;
    return found;
  };

  function sliceIntoChunks(arr: any[], chunkSize: number) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  const arr = sliceIntoChunks(rows, 10);

  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <div>
          {arr.map((chunck: any) => {
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
                          isSelected(item) ? classes.selectedNumber : ""
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
        </div>
      </header>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Row from "./row";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Row />
          </Grid>
        </div>
      </header>
    </div>
  );
}

export default App;

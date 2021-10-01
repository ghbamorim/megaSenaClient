import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Card from "./features/card/card";
import ClippedDrawer from "./features/menu/menu";

const useStyles = makeStyles((theme) => ({
  App: {
    textAlign: "center",
    backgroundColor: "#FDFDD7",
  },

  AppHeader: {
    alignItems: "center",
    justifyContent: "center",
    color: "#DF977E",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <ClippedDrawer></ClippedDrawer>
        <Card></Card>
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

import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Last from "./features/last/last";
import ClippedDrawer from "./features/menu/menu";
import SelectResult from "./features/selectResult/selectResult";
import TryPage from "./features/tryPage/tryPage";
import { Provider } from "react-redux";
import store from "./store";

const drawerWidth = 240;
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
  drawerOpen: {
    width: drawerWidth,
    zIndex: 10,
  },
  drawerClosed: {
    width: 5,
    zIndex: 10,
  },
  appBar: {
    zIndex: 2000,
  },
  content: {
    paddingTop: 50,
    paddingLeft: drawerWidth - 40,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.App}>
      <Provider store={store}>
        <header className={classes.AppHeader}>
          <Router>
            <ClippedDrawer classes={classes}></ClippedDrawer>
            <div className={classes.content}>
              <Switch>
                <Route path="/last">
                  <Last />
                </Route>
                <Route path="/selectResult">
                  <SelectResult />
                </Route>
                <Route path="/try">
                  <TryPage />
                </Route>
              </Switch>
            </div>
          </Router>
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
      </Provider>
    </div>
  );
}

export default App;

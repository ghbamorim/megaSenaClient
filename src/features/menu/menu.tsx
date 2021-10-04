import { AppBar, Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Toolbar from "@material-ui/core/Toolbar";
import * as React from "react";
import { Link } from "react-router-dom";

interface IMenu {
  classes: any;
}

const ClippedDrawer: React.FC<IMenu> = ({ classes }: IMenu) => {
  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Mega Sena
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" className={classes.drawer}>
        <Toolbar />
        <List>
          <ListItem button key={"Resultado mais recente"}>
            <Link to="/last">Resultado mais recente</Link>
          </ListItem>
          <ListItem button key={"Selecionar resultado"}>
            <Link to="/selectResult">Selecionar resultado</Link>
          </ListItem>
          <ListItem button key={"Praticar"}>
            <Link to="/try">Praticar</Link>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default ClippedDrawer;

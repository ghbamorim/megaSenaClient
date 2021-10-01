import { AppBar, Typography } from "@material-ui/core";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import * as React from "react";

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
          {[
            "Resultado mais recente",
            "Selecionar resultado",
            "Send email",
            "Drafts",
          ].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default ClippedDrawer;

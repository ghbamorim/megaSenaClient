import { AppBar, Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Toolbar from "@material-ui/core/Toolbar";
import * as React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

interface IMenu {
  classes: any;
}

const ClippedDrawer: React.FC<IMenu> = ({ classes }: IMenu) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setMenuOpen(open);
    };

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mega Sena
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={"left"}
        className={classes.drawerOpen}
        open={menuOpen}
        onClose={toggleDrawer(false)}
      >
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

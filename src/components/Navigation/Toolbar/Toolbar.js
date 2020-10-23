import React from "react";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import ToggleButton from "../../../components/Navigation/SideDrawer/ToggleButton/ToggleButton";
import Logo from "../../Logo/Logo";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <ToggleButton clicked={props.clicked} />
    <Logo height="80%" />
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;

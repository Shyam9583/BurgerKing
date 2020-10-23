import React, { useState } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [state, setState] = useState({
    showSideDrawer: false,
  });

  const openDrawer = () => setState({ ...state, showSideDrawer: true });
  const closeDrawer = () => setState({ ...state, showSideDrawer: false });

  return (
    <React.Fragment>
      <Toolbar clicked={openDrawer} />
      <SideDrawer clicked={closeDrawer} show={state.showSideDrawer} />
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;

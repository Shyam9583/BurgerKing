import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";
import { Link } from "react-router-dom";

const logo = (props) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <Link to="/">
      <img src={burgerLogo} alt="BurgerKing" />
    </Link>
  </div>
);

export default logo;

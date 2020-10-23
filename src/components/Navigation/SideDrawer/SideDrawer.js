import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let sideDrawerClasses = [classes.SideDrawer, classes.Close];
    if(props.show)
        sideDrawerClasses = [classes.SideDrawer, classes.Open];
  return (
    <React.Fragment>
      <Backdrop show={props.show} dismissed={props.clicked} />
      <div className={sideDrawerClasses.join(' ')}>
        <Backdrop clicked={props.dismissDrawer} />
        <Logo className={classes.Logo} height="9%" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;

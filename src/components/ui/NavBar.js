import React from 'react';

import classes from '../../assets/stylesheets/navbar.module.scss';

const navBar = props => {
    return (
        <div className={classes.NavBar}>
            <h1 className={classes.Brand}>Pokedex</h1>
        </div>
    );
};

export default navBar;

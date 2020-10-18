import React from 'react';

import classes from '../../assets/stylesheets/backdrop.module.scss';

const backdrop = props => {
    return props.show ? (
        <div className={classes.Backdrop} onClick={props.clicked}></div>
    ) : null;
};

export default backdrop;

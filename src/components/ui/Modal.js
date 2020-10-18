import React from 'react';

import Backdrop from './Backdrop';
import classes from '../../assets/stylesheets/modal.module.scss';

const modal = props => {
    return (
        <>
            <Backdrop show={props.show} clicked={props.clicked} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show
                        ? 'translateY(-50%)'
                        : 'translateY(-150vh)',
                    opacity: props.show ? '1' : '0',
                }}>
                {props.children}
            </div>
        </>
    );
};

export default modal;

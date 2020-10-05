import React from 'react';

import classes from '../../assets/stylesheets/button.module.css';

const button = props => {
    const styles = [classes.Button];
    switch (props.btnStyle) {
        case 'success':
            styles.push(classes.Success);
            break;
        case 'danger':
            styles.push(classes.Danger);
            break;
        default:
            styles.push(classes.Primary);
    }

    return (
        <button
            type={props.btnType || 'button'}
            className={styles.join(' ')}
            onClick={props.clicked || null}>
            {props.children}
        </button>
    );
};

export default button;

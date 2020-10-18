import React from 'react';

import classes from '../../assets/stylesheets/button.module.scss';

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
    if (props.disabled) styles.push(classes.Disabled);

    return (
        <button
            type={props.btnType || 'button'}
            className={styles.join(' ')}
            onClick={props.clicked || null}
            disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default button;

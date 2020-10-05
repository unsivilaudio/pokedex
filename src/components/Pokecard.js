import React from 'react';

import classes from '../assets/stylesheets/pokecard.module.css';

const pokeCard = props => {
    const styles = [classes.PokeCard];
    if (props.selected) styles.push(classes.Selected);

    return (
        <div className={styles.join(' ')} onClick={props.clicked}>
            <h3 className={classes.Title}>{props.title}</h3>
            <img className={classes.Icon} src={props.img} alt={props.title} />
            <div className={classes.Stats}>
                <p>Type: {props.type}</p>
                <p>EXP: {props.exp}</p>
            </div>
        </div>
    );
};

export default pokeCard;

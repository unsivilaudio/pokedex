import React, { useState } from 'react';

import PokeCard from './Pokecard';
import Button from './ui/Button';
import classes from '../assets/stylesheets/resultlist.module.css';

const ResultList = props => {
    const [message, setMessage] = useState(null);

    const renderLastStanding = () => {
        return props.winners
            .filter(el => !el.disabled)
            .map(hero => {
                return (
                    <PokeCard
                        key={hero.id}
                        title={hero.name}
                        img={hero.img}
                        type={hero.type}
                        exp={hero.base_experience}
                        disabled={hero.disabled}
                    />
                );
            });
    };
    const handleShareAction = e => {
        e.preventDefault();
        const dummy = document.createElement('input'),
            text = window.location.href;

        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        setMessage('copied to clipboard');
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    };

    return (
        <div className={classes.ResultList}>
            <h1>{props.victor === 'heroes' ? 'You Won!' : 'Game Over'}</h1>
            <div className={classes.Content}>
                <h3 className={classes.Header}>Last Pokemon Standing</h3>
                <div className={classes.Cards}>{renderLastStanding()}</div>
            </div>
            <div className={classes.Actions}>
                <Button btnStyle='primary' clicked={props.reset}>
                    Play Again
                </Button>
                {message ? <p>{message}</p> : null}
                <Button btnStyle='success' clicked={handleShareAction}>
                    Share
                </Button>
            </div>
        </div>
    );
};

export default ResultList;

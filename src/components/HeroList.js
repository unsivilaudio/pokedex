import React from 'react';

import PokeCard from './Pokecard';
import Button from './ui/Button';
import classes from '../assets/stylesheets/herolist.module.scss';

const heroList = props => {
    const renderSelectedHeros = () => {
        const heroList = props.data.filter(el =>
            props.selected.includes(el.id)
        );
        return heroList.map(el => {
            const imgId = (el.id + 1000)
                .toString()
                .split('')
                .splice(1)
                .join('');
            const imgSrc = `${props.baseURL}/${imgId}.png`;
            return (
                <PokeCard
                    selected={false}
                    clicked={null}
                    key={el.id}
                    title={el.name}
                    img={imgSrc}
                    type={el.type}
                    exp={el.base_experience}
                />
            );
        });
    };

    return (
        <div className={classes.HeroList}>
            <h1 className={classes.Header}>Your Heros</h1>
            <div className={classes.Content}>{renderSelectedHeros()}</div>
            <div className={classes.Actions}>
                <Button btnStyle='danger' clicked={props.cancelled}>
                    Reset
                </Button>
                <Button btnStyle='success' clicked={props.continued}>
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default heroList;

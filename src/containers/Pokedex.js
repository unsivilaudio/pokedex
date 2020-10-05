import React from 'react';

import PokeCard from '../components/Pokecard';
import classes from '../assets/stylesheets/pokedex.module.css';

const pokeData = [
    { id: 4, name: 'Charmander', type: 'fire', base_experience: 62 },
    { id: 7, name: 'Squirtle', type: 'water', base_experience: 63 },
    { id: 11, name: 'Metapod', type: 'bug', base_experience: 72 },
    { id: 12, name: 'Butterfree', type: 'flying', base_experience: 178 },
    { id: 25, name: 'Pikachu', type: 'electric', base_experience: 112 },
    { id: 39, name: 'Jigglypuff', type: 'normal', base_experience: 95 },
    { id: 94, name: 'Gengar', type: 'poison', base_experience: 225 },
    { id: 133, name: 'Eevee', type: 'normal', base_experience: 65 },
];

class Pokedex extends React.Component {
    state = {
        heros: [],
        gameStart: false,
    };

    selectHero = async id => {
        if (this.state.heros.length < 4 && !this.state.gameStart) {
            await this.setState(prevState => prevState.heros.push(id));
            console.log(this.state);
        }
    };

    renderPokeList = () => {
        return pokeData.map(el => {
            const imgId = (el.id + 1000)
                .toString()
                .split('')
                .splice(1)
                .join('');
            // const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${el.id}.png`;
            const imgSrc = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgId}.png`;
            const isSelect = this.state.heros.includes(el.id);
            return (
                <PokeCard
                    selected={isSelect}
                    clicked={() => this.selectHero(el.id)}
                    key={el.id}
                    title={el.name}
                    img={imgSrc}
                    type={el.type}
                    exp={el.base_experience}
                />
            );
        });
    };

    render() {
        return (
            <div className={classes.Pokedex}>
                <h1 className={classes.Header}>Choose your hero</h1>
                <div className={classes.CardList}>{this.renderPokeList()}</div>
            </div>
        );
    }
}

export default Pokedex;
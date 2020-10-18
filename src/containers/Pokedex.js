import React from 'react';

import Modal from '../components/ui/Modal';
import PokeCard from '../components/Pokecard';
import HeroList from '../components/HeroList';
import classes from '../assets/stylesheets/pokedex.module.scss';
import PokeGame from '../components/PokeGame';

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

const BASE_URL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail';

class Pokedex extends React.Component {
    state = {
        heroes: [],
        enemies: [],
        modalShow: false,
        gameStart: false,
    };

    selectHero = async id => {
        if (
            this.state.heroes.length < 4 &&
            !this.state.gameStart &&
            !this.state.heroes.includes(id) &&
            !this.state.enemies.includes(id)
        ) {
            await this.setState(prevState => prevState.heroes.push(id));
            this.selectEnemies(this.randomRoll());
            if (this.state.heroes.length === 4) {
                this.setState(prevState => {
                    return { ...prevState, modalShow: true };
                });
            }
        }
    };

    selectEnemies = async id => {
        if (
            this.state.heroes.length <= 4 &&
            !this.state.heroes.includes(id) &&
            !this.state.enemies.includes(id)
        ) {
            await this.setState(prevState => {
                const enemies = prevState.enemies.concat(id);
                return { ...prevState, enemies };
            });
        } else {
            this.selectEnemies(this.randomRoll());
        }
    };

    getBattleData = ids => {
        return pokeData
            .filter(el => ids.includes(el.id))
            .map(item => {
                const imgId = (item.id + 1000)
                    .toString()
                    .split('')
                    .splice(1)
                    .join('');
                const img = `${BASE_URL}/${imgId}.png`;
                return { ...item, img, disabled: false };
            });
    };

    randomRoll = () => {
        const data = pokeData.filter(
            el =>
                !this.state.heroes.includes(el.id) &&
                !this.state.enemies.includes(el.id)
        );
        let roll = 0;
        if (data.length > 1) {
            roll = Math.floor(Math.random() * data.length);
        }
        const randomId = data[roll].id;
        return randomId;
    };

    renderPokeList = () => {
        return pokeData.map(el => {
            const imgId = (el.id + 1000)
                .toString()
                .split('')
                .splice(1)
                .join('');
            const imgSrc = `${BASE_URL}/${imgId}.png`;
            const isSelect = this.state.heroes.includes(el.id);
            const isEnemy = this.state.enemies.includes(el.id);
            const disabled = isSelect || isEnemy;
            return (
                <PokeCard
                    disabled={disabled}
                    selected={isSelect}
                    enemied={isEnemy}
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

    handleResetHero = e => {
        this.setState(prevState => {
            return { ...prevState, modalShow: false };
        });
        setTimeout(
            () =>
                this.setState(prevState => ({
                    ...prevState,
                    heroes: [],
                    enemies: [],
                    gameStart: false,
                })),
            500
        );
    };

    handleContinueHero = () => {
        this.setState(prevState => {
            return { ...prevState, gameStart: true, modalShow: false };
        });
    };

    render() {
        let container = (
            <div className={classes.Pokedex}>
                <h1 className={classes.Header}>Choose your heroes</h1>
                <div className={classes.CardList}>{this.renderPokeList()}</div>
            </div>
        );

        if (this.state.gameStart)
            container = (
                <PokeGame
                    enemies={this.getBattleData(this.state.enemies)}
                    heroes={this.getBattleData(this.state.heroes)}
                    resetGame={this.handleResetHero}
                />
            );

        return (
            <>
                <Modal
                    show={this.state.modalShow}
                    clicked={this.handleResetHero}>
                    <HeroList
                        data={pokeData}
                        selected={this.state.heroes}
                        baseURL={BASE_URL}
                        cancelled={this.handleResetHero}
                        continued={this.handleContinueHero}
                    />
                </Modal>
                {container}
            </>
        );
    }
}

export default Pokedex;

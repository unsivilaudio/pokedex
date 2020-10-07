import React from 'react';

import PokeCard from './Pokecard';
import ResultList from './ResultList';
import Button from './ui/Button';
import Modal from './ui/Modal';
import classes from '../assets/stylesheets/pokegame.module.css';

class PokeGame extends React.Component {
    state = {
        commentary: null,
        round: 1,
        gamePlaying: true,
        gameWinner: null,
        modalShow: false,
        attacking: true,
        enemies: this.props.enemies,
        heroes: this.props.heroes,
    };

    rollAttack = type => {
        const data = this.state[type].filter(el => el.disabled === false);
        let random = 0;
        if (data.length > 1) random = Math.floor(Math.random() * data.length);
        return data[random];
    };

    battleRound = () => {
        const hero = this.rollAttack('heroes');
        const enemy = this.rollAttack('enemies');
        const chance = Math.random();
        const overwhelm = this.state.attacking
            ? hero.base_experience > enemy.base_experience
            : enemy.base_experience > hero.base_experience;
        const defenders = !this.state.attacking ? 'heroes' : 'enemies';
        const defendant = !this.state.attacking ? hero : enemy;
        const commentary = this.state.attacking
            ? `${hero.name} %ACTION% ${enemy.name}`
            : `${enemy.name} %ACTION% ${hero.name}`;

        let updateState = {};
        updateState.round = this.state.round + 1;
        updateState.attacking = !this.state.attacking;

        if (chance > 0.8 || (chance > 0.3 && overwhelm)) {
            const deaths = [];
            updateState.commentary = commentary.replace('%ACTION%', 'HITS');
            updateState[defenders] = this.state[defenders].map(el => {
                if (el.id === defendant.id) el.disabled = true;
                deaths.push(el.disabled);
                return el;
            });
            if (deaths.every(el => el === true)) {
                updateState.gamePlaying = false;
                updateState.modalShow = true;
                updateState.gameWinner =
                    defenders === 'heroes' ? 'enemies' : 'heroes';
            }
            this.setState(prevState => {
                return {
                    ...prevState,
                    ...updateState,
                };
            });
        } else {
            this.setState(prevState => {
                updateState.commentary = commentary.replace(
                    '%ACTION%',
                    'MISSES'
                );
                return {
                    ...prevState,
                    ...updateState,
                };
            });
        }
    };

    renderCards = cards => {
        return cards.map(el => {
            return (
                <PokeCard
                    key={el.id}
                    title={el.name}
                    img={el.img}
                    type={el.type}
                    exp={el.base_experience}
                    disabled={el.disabled}
                />
            );
        });
    };

    handleCloseModal = () => {
        this.setState(prevState => ({ ...prevState, modalShow: false }));
    };

    render() {
        return (
            <>
                <Modal
                    show={this.state.modalShow}
                    clicked={this.handleCloseModal}>
                    {this.state.gameWinner ? (
                        <ResultList
                            reset={this.props.resetGame}
                            victor={this.state.gameWinner}
                            winners={this.state[this.state.gameWinner]}
                        />
                    ) : null}
                </Modal>
                <div className={classes.PokeGame}>
                    <h1>The PokeDex Game Has Begun</h1>
                    <div className={classes.Row}>
                        <div className={classes.Heroes}>
                            <h3>
                                Your Heroes!
                                <span>
                                    {this.state.attacking ? 'ATTACK' : 'DEFEND'}
                                </span>
                            </h3>
                            <div className={classes.Cards}>
                                {this.renderCards(this.state.heroes)}
                            </div>
                        </div>
                        <div className={classes.Referee}>
                            <p>
                                {this.state.commentary
                                    ? this.state.commentary
                                    : null}
                            </p>
                            <h2>Round {this.state.round}</h2>
                            <div className={classes.Actions}>
                                <Button
                                    btnStyle='danger'
                                    clicked={this.battleRound}
                                    disabled={!this.state.gamePlaying}>
                                    Fight!
                                </Button>
                                <Button clicked={this.props.resetGame}>
                                    Start Over
                                </Button>
                            </div>
                        </div>
                        <div className={classes.Enemies}>
                            <h3>
                                Your Enemies
                                <span>
                                    {this.state.attacking ? 'DEFEND' : 'ATTACK'}
                                </span>
                            </h3>
                            <div className={classes.Cards}>
                                {this.renderCards(this.state.enemies)}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default PokeGame;

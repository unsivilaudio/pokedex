import React from 'react';

import PokeCard from './Pokecard';
import Button from './ui/Button';
import classes from '../assets/stylesheets/pokegame.module.css';

class PokeGame extends React.Component {
    state = {
        commentary: null,
        round: 1,
        gamePlaying: true,
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
        const round = this.state.round + 1;
        const attacking = !this.state.attacking;
        if (this.state.attacking) {
            if (
                (chance > 0.5 &&
                    hero.base_experience > enemy.base_experience) ||
                chance > 0.8
            ) {
                this.setState(prevState => {
                    const commentary = `${hero.name} HITS ${enemy.name}`;
                    const enemies = this.state.enemies.map(el => {
                        if (el.id === enemy.id) el.disabled = true;
                        return el;
                    });

                    return {
                        ...prevState,
                        commentary,
                        enemies,
                        round,
                        attacking,
                    };
                });
            } else {
                this.setState(prevState => {
                    const commentary = `${hero.name} MISSES ${enemy.name}`;
                    return {
                        ...prevState,
                        commentary,
                        round,
                        attacking,
                    };
                });
            }
        } else {
            if (
                (chance > 0.5 &&
                    hero.base_experience < enemy.base_experience) ||
                chance > 0.8
            ) {
                this.setState(prevState => {
                    const commentary = `${enemy.name} HITS ${hero.name}`;
                    const heroes = this.state.heroes.map(el => {
                        if (el.id === hero.id) el.disabled = true;
                        return el;
                    });
                    return {
                        ...prevState,
                        commentary,
                        heroes,
                        round,
                        attacking,
                    };
                });
            } else {
                this.setState(prevState => {
                    const commentary = `${enemy.name} MISSES ${hero.name}`;
                    return {
                        ...prevState,
                        commentary,
                        round,
                        attacking,
                    };
                });
            }
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

    render() {
        return (
            <div className={classes.PokeGame}>
                <h1>The PokeDex Game Has Begun</h1>
                <div className={classes.Row}>
                    <div className={classes.Heroes}>
                        <h3>
                            Your Heroes!
                            <span>{this.state.attacking ? '*' : null}</span>
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
                                clicked={this.battleRound}>
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
                            <span>{!this.state.attacking ? '*' : null}</span>
                        </h3>
                        <div className={classes.Cards}>
                            {this.renderCards(this.state.enemies)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PokeGame;

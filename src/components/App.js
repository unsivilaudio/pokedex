import React from 'react';
import Pokedex from '../containers/Pokedex';
import NavBar from './ui/NavBar';

const app = props => {
    return (
        <div>
            <NavBar />
            <Pokedex />
        </div>
    );
};

export default app;

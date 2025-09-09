// src/context/GameContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getRandomPokemons } from '../api/pokemonApi';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [pokemons, setPokemons] = useState([]);
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [timer, setTimer] = useState(0);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);

    const startGame = async () => {
        const storedPokemons = localStorage.getItem('pokemons');

        let randomPokemons = [];
        if (storedPokemons) {
            randomPokemons = JSON.parse(storedPokemons);
            setPokemons(randomPokemons);
        } else {
            randomPokemons = await getRandomPokemons(8);
            setPokemons(randomPokemons);
            localStorage.setItem('pokemons', JSON.stringify(randomPokemons));
        }

        // Duplicate and shuffle
        const duplicated = [...randomPokemons, ...randomPokemons]
            .map((pokemon, index) => ({ ...pokemon, id: index }))
            .sort(() => Math.random() - 0.5);

        setCards(duplicated);
        setSelectedCards([]);
        setMatchedCards([]);
        setGameOver(false);
        setTimer(0);
        setMoves(0);
    };

    const flipCard = (index) => {
        if (selectedCards.length < 2 && !selectedCards.includes(index) && !matchedCards.includes(index)) {
            setSelectedCards([...selectedCards, index]);

            if (!intervalId) {
                const id = setInterval(() => setTimer(prev => prev + 1), 1000);
                setIntervalId(id);
            }
        }
    };

    useEffect(() => {
        if (selectedCards.length === 2) {
            setMoves(prev => prev + 1);
            const [firstIndex, secondIndex] = selectedCards;
            if (cards[firstIndex].name === cards[secondIndex].name) {
                setMatchedCards([...matchedCards, firstIndex, secondIndex]);
                setSelectedCards([]);
            } else {
                const timeout = setTimeout(() => setSelectedCards([]), 1000);
                return () => clearTimeout(timeout);
            }
        }
    }, [selectedCards, cards, matchedCards]);

    // Load leaderboard from localStorage on mount
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('leaderboard')) || [];
        setLeaderboard(storedData);
    }, []);

    // Check game over and update leaderboard
    useEffect(() => {
        if (cards.length > 0 && matchedCards.length === cards.length && !gameOver) {
            setGameOver(true);
            if (intervalId) clearInterval(intervalId);

            const playerName = prompt("Congratulations! You've completed the game. Please enter your name:");

            const newRecord = {
                name: playerName || 'Anonymous',
                time: timer,
                moves,
                date: new Date().toISOString()
            };

            const updatedLeaderboard = [...leaderboard, newRecord];
            setLeaderboard(updatedLeaderboard);
            localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));

            setTimeout(() => {
                startGame();
            }, 500);
        }
        // eslint-disable-next-line
    }, [matchedCards, cards, intervalId, timer, moves, gameOver, leaderboard]);

    useEffect(() => {
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [intervalId]);

    return (
        <GameContext.Provider value={{
            cards,
            selectedCards,
            matchedCards,
            flipCard,
            startGame,
            timer,
            moves,
            gameOver,
            pokemons,
            leaderboard
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
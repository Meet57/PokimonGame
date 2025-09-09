// src/components/Board.js
import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import Tile from './Tile';

const Board = () => {
    const { cards, selectedCards, matchedCards, flipCard, startGame, timer, moves } = useGame();

    const [showHackerMode, setShowHackerMode] = useState(false);

    useEffect(() => {
        startGame();

        const handleKeyDown = (e) => {
            if (e.key.toLowerCase() === 'h') {
                setShowHackerMode(true); // toggle hacker mode
            }
        };

        const handleKeyUp = (e) => {
            if (e.key.toLowerCase() === 'h') {
                setShowHackerMode(false); // turn off hacker mode on key up
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-col sm:flex-row justify-between w-full mb-4 px-2 sm:px-4">
                <p className="text-lg font-semibold">⏱️ Time: {timer}s</p>
                <p className="text-lg font-semibold">🎯 Moves: {moves}</p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-3 sm:gap-4 place-items-center">
                {cards.map((card, index) => (
                    <Tile
                        showHackerMode={showHackerMode}
                        key={card.id + '-' + index}
                        card={card}
                        isFlipped={selectedCards.includes(index) || matchedCards.includes(index)}
                        onClick={() => flipCard(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;

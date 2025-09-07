// src/components/Board.js
import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import Tile from './Tile';

const Board = () => {
    const { cards, selectedCards, matchedCards, flipCard, startGame, timer, moves } = useGame();

    useEffect(() => {
        startGame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            {/* Game Info */}
            <div className="flex justify-between w-full mb-4 px-4">
                <p className="text-lg font-semibold">⏱️ Time: {timer}s</p>
                <p className="text-lg font-semibold">🎯 Moves: {moves}</p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-4 gap-4 place-items-center">
                {cards.map((card, index) => (
                    <Tile
                        key={card.id}
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

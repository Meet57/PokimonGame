// src/components/Tile.js
import React, { useState, useEffect } from 'react';

const Tile = ({ card, isFlipped, onClick, showHackerMode }) => {

    return (
        <div
            className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 cursor-pointer"
            onClick={onClick}
        >
            {/* Pokémon Image */}
            <div
                className={`absolute w-full h-full rounded-xl flex items-center justify-center transition-opacity duration-500 ${isFlipped || showHackerMode ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <img src={card.image} alt={card.name} className="w-20 h-20 object-contain" />
            </div>

            {/* Backside */}
            {!isFlipped && (
                <div className="absolute w-full h-full bg-gray-700 rounded-xl flex items-center justify-center">
                    <span className="text-xl font-bold text-yellow-400">
                        {showHackerMode ? card.name : '?'}
                    </span>
                </div>
            )}
        </div>
    );
};

export default Tile;
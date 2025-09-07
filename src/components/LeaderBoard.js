// src/components/Leaderboard.js
import React from 'react';
import { useGame } from '../context/GameContext';


const Leaderboard = () => {

    const { leaderboard } = useGame();

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
            {leaderboard && leaderboard.length === 0 ? (
                <p className="text-gray-400">No scores yet</p>
            ) : (
                <ul className="space-y-2">
                    {leaderboard.map((record, index) => (
                        <li
                            key={index}
                            className="flex justify-between bg-gray-700 rounded-lg p-2"
                        >
                            <span>{record.name}</span>
                            <span>{record.time}s / {record.moves} moves</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Leaderboard;
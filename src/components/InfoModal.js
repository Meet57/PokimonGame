// src/components/InfoModal.js
import React, { useState } from 'react';

const InfoModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Info Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 bg-yellow-400 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg hover:bg-yellow-500 transition font-bold text-lg"
            >
                i
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gray-900 text-white rounded-xl p-6 w-11/12 max-w-md shadow-lg relative border-2 border-yellow-400">
                        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Game Info</h2>
                        <p className="mb-2">Welcome to the Pokémon Matching Game!</p>
                        <ul className="list-disc ml-5 mb-4">
                            <li>Match all Pokémon pairs to win.</li>
                            <li>Click on cards to reveal the Pokémon.</li>
                            <li>Use the 'H' key to enable Hacker Mode (reveals all cards).</li>
                            <li>The timer counts your game duration, and moves track your clicks.</li>
                            <li>Your score will be saved to the leaderboard when you finish.</li>
                        </ul>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-yellow-400 hover:text-yellow-500 font-bold text-xl"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default InfoModal;

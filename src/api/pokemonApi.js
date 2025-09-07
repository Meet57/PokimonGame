// src/api/pokemonApi.js
import axios from 'axios';

export const getRandomPokemons = async (count = 8) => {
    try {
        // Step 1: Get total number of pokemons
        const totalRes = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1');
        const totalCount = totalRes.data.count;

        // Step 2: Generate random unique IDs
        const ids = new Set();
        while (ids.size < count) {
            const randomId = Math.floor(Math.random() * totalCount) + 1;
            ids.add(randomId);
        }

        // Step 3: Fetch pokemon details for each ID
        const promises = Array.from(ids).map(async (id) => {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = res.data;
            return {
                id: data.id,
                name: data.name,
                image: data.sprites.other['official-artwork'].front_default
            };
        });

        const pokemons = await Promise.all(promises);
        return pokemons;

    } catch (error) {
        console.error('Error fetching random pokemons:', error);
        return [];
    }
};

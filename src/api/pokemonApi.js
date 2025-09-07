// src/api/pokemonApi.js
import axios from 'axios';
import dummyData from './dummyAPi';


const fetchPokemonById = async (id) => {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = res.data;
        return {
            id: data.id,
            name: data.name,
            image: data.sprites.other['official-artwork'].front_default
        };
    } catch (error) {
        return null;
    }
};

export const getRandomPokemons = async (count = 8) => {
    const pokemons = [];

    try {
        // Try fetching from API
        for (let i = 0; i < count; i++) {
            const randomId = Math.floor(Math.random() * 1000) + 1;
            const pokemon = await fetchPokemonById(randomId);
            if (pokemon) pokemons.push(pokemon);
        }

        // If we could not fetch enough, fallback to dummy
        if (pokemons.length < count) {
            console.warn('Using dummy data due to partial API failures');
            return dummyData.sort(() => 0.5 - Math.random()).slice(0, count);
        }

        return pokemons;
    } catch (error) {
        console.warn('API fetch failed, using dummy data');
        return dummyData.sort(() => 0.5 - Math.random()).slice(0, count);
    }
};
// lib/pokemon.js
export async function fetchPokemonData(pokemonName) {
  const pokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  try {
    const response = await fetch(pokemonApiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return null; // or throw error, depending on your needs
  }
}

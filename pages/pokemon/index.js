import Image from "next/image";
import { fetchPokemonData } from "../../lib/pokemon";

const formatName = (name) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export async function getServerSideProps() {
  const pokemonData = await fetchPokemonData("pikachu");

  if (!pokemonData) {
    return {
      props: {
        errorMessage: "Failed to load Pokémon data.",
      },
    };
  }

  return {
    props: {
      pokemonData,
    },
  };
}

export default function PokemonPage({ pokemonData, errorMessage }) {
  if (errorMessage) {
    return <p style={{ color: "red" }}>{errorMessage}</p>;
  }

  if (!pokemonData || !pokemonData.name) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>My Favorite Pokémon!</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "8px",
          marginTop: "15px",
        }}>
        <h2>{formatName(pokemonData.name)}</h2>

        {pokemonData.sprites?.front_default && (
          <Image
            src={pokemonData.sprites.front_default}
            alt={`Sprite of ${formatName(pokemonData.name)}`}
            width={96}
            height={96}
            style={{ border: "1px dashed grey", margin: "10px 0" }}
          />
        )}

        <p>
          <strong>Pokédex ID:</strong> {pokemonData.id}
        </p>
        <p>
          <strong>Height:</strong> {pokemonData.height / 10} m
        </p>
        <p>
          <strong>Weight:</strong> {pokemonData.weight / 10} kg
        </p>

        <p>
          <strong>Types:</strong>
        </p>
        <ul>
          {pokemonData.types.map((typeInfo) => (
            <li key={typeInfo.slot}>{formatName(typeInfo.type.name)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

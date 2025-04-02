import useSWR from "swr";
import Image from "next/image";

// Fetch function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PokemonPage() {
  const { data, error, isLoading } = useSWR(
    "https://pokeapi.co/api/v2/pokemon/rattata",
    fetcher
  );
  

  if (error) return <p style={{ color: "red" }}>Failed to load Pokemon.</p>;
  if (isLoading) return <p>Loading...</p>

  return (
    <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
        <h1>Client-Side Pokemon Fetching with SWR</h1>
        <div style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '8px',
            marginTop: '15px'
        }}>
            <h2>{data.name.toUpperCase()}</h2>

            {data.sprites?.from_default && (
                <Image
                    src={data.sprites.front_default}
                    alt={`Sprite of ${data.name}`}
                    width={96}
                    height={96}
                    style={{ border: '1px dashed grey', margin: '10px 0'}}
                />
            )}
            
            <p><strong>Pokedex ID:</strong> {data.id}</p>
            <p><strong>Height:</strong> {data.height} m</p>
            <p><strong>Weight: </strong> {data.weight / 10} kg</p>

            <p><strong>Types:</strong></p>
            <ul>
                {data.types.map((typeInfo) => (
                    <li key={typeInfo.slot}>
                        {typeInfo.type.name.toUpperCase()}
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

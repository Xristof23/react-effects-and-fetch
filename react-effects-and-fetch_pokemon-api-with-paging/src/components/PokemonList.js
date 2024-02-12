import { useEffect, useState } from "react";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${count}`
        );
        const data = await response.json();
        setPokemon(data.results);
      } catch (error) {
        console.log(error);
      }
    }

    loadPokemon();
  }, [count]);

  return (
    <main>
      {count === 0 ? null : (
        <button
          type="button"
          onClick={() => {
            console.log("clicked prev");
            setCount(count - 20);
          }}
        >
          Previous Page
        </button>
      )}
      <button
        type="button"
        onClick={() => {
          setCount(count + 20);
        }}
      >
        Next Page
      </button>
      <ul>
        {pokemon.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </main>
  );
}

export default class PokemonClient {
  constructor() {
    {
      https: this.baseUrl = "https://pokeapi.co/api/v2/pokemon/";
    }
  }

  async fetchPokemonsById(pokemonsArr) {
    const pokemons = await Promise.all(
      pokemonsArr.map(async (id) => {
        const response = await fetch(`${this.baseUrl}${id}`);
        if (response.ok) {
          return response.json();
        } else {
          return id;
        }
      })
    ).catch((e) => {
      console.log(e);
    });
    return pokemons;
  }
}

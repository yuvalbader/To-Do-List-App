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
        return response.json();
      })
    ).catch((e) => {
      throw e;
    });
    return pokemons;
  }
}

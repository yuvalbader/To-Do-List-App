const axios = require("axios").default;

class PokemonClient {
  constructor() {
    {
      https: this.baseUrl = "https://pokeapi.co/api/v2/pokemon/";
    }
  }

  async fetchPokemonsById(pokemonsArr) {
    const pokemons = await Promise.all(
      pokemonsArr.map(
        async (id) =>
          await axios.get(`${this.baseUrl}${id}`).catch((e) => {
            return e.response;
          })
      )
    );
    return pokemons;
  }
}

module.exports = new PokemonClient();

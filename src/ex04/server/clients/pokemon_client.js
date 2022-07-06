// const axios = require("axios").default;

// class PokemonClient {
//   constructor() {
//     {
//       https: this.baseUrl = "https://pokeapi.co/api/v2/pokemon/";
//     }
//   }

//   async fetchPokemonsById(pokemonsArr) {
//     const pokemons = await Promise.all(
//       pokemonsArr.map(
//         async (id) =>
//           await axios.get(`${this.baseUrl}${id}`).catch((e) => {
//             return e.response;
//           })
//       )
//     );
//     return pokemons;
//   }
// }

// module.exports = new PokemonClient();

const axios = require("axios");

class PokemonClient {
  constructor() {
    this.API_URL = "https://pokeapi.co/api/v2/pokemon/";
  }

  async getPokemon(id) {
    try {
      const response = await axios.get(`${this.API_URL}${id}`);
      const pokemon = response.data;

      return pokemon;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch pokemon");
    }
  }

  async getManyPokemon(ids) {
    try {
      const promises = ids.map((id) => axios.get(`${this.API_URL}${id}`));
      const responses = await Promise.all(promises);

      const pokemons = responses.map((r) => r.data);
      return pokemons;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch pokemon");
    }
  }
}

module.exports = PokemonClient;

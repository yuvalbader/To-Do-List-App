const pokemonClient = require("../clients/pokemon_client");
const Task = require("../objects/Task");

const isOnlyNumbersAndCommas = (content) => {
  const regex = /^[\d,]+$/;
  return regex.test(content);
};

const parseContentToIds = (content) => {
  return content.split(",");
};

const createItemToAdd = async (content) => {
  if (isOnlyNumbersAndCommas(content)) {
    const parsedContent = parseContentToIds(content);
    try {
      const pokemons = await pokemonClient.fetchPokemonsById(parsedContent);

      const pokemonsTasks = pokemons.map((pokemon) => {
        if (pokemon.status === 200) {
          return new Task(
            `catch ${pokemon.data.name} with Id ${pokemon.data.id}`,
            false
          );
        } else if (pokemon.status === 404) {
          return new Task(
            `Unable to fetch pokemon with Id ${response.id}`,
            false
          );
        }
      });
      return pokemonsTasks;
    } catch (e) {
      throw new Error("Failed to fetch data");
    }
  } else {
    return [new Task(content, false)];
  }
};

module.exports = {
  createItemToAdd,
};

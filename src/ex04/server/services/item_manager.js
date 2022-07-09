const PokemonClient = require("../clients/pokemon_client");
const { Items } = require("../db/models");

class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient();
  }

  getAllItems = async () => {
    try {
      return await Items.findAll({
        attributes: ["id", "taskContent", "isDone", "done_timestamp", "imgUrl"],
      });
    } catch (e) {
      throw new Error("An error occurred while getting all items");
    }
  };

  handleItem = async (item) => {
    try {
      if (this._isNumber(item)) {
        return await this.fetchAndAddPokemon(item);
      }
      if (this._isList(item)) {
        return await this.fetchAndAddManyPokemon(item);
      }

      const newItem = await this.addItem({
        task: item,
        isDone: false,
        imgUrl: "https://thumbs.dreamstime.com/b/sticky-todo-11106198.jpg",
      });
      return newItem;
    } catch (err) {
      throw err;
    }
  };

  addItem = async (item) => {
    try {
      const existingItem = await Items.findOne({
        where: { taskContent: item.task },
      });
      if (existingItem) {
        throw new Error("Item already exists");
      } else {
        return await Items.bulkCreate([
          { taskContent: item.task, IsDone: false, imgUrl: item.imgUrl },
        ]);
      }
    } catch (e) {
      throw e;
    }
  };

  toggleTaskStatus = async (id) => {
    try {
      const item = await Items.findOne({ where: { id } });
      const newVal = !item.IsDone;
      await Items.update({ IsDone: newVal }, { where: { id: id } });
      return newVal;
    } catch (e) {
      return e;
    }
  };

  setDoneTimestamp = async (id, newVal, doneTimestamp) => {
    try {
      if (newVal) {
        await Items.update(
          { done_timestamp: doneTimestamp },
          { where: { id: id } }
        );
      } else {
        await Items.update({ done_timestamp: null }, { where: { id: id } });
      }
    } catch (e) {
      throw e;
    }
  };

  handleCheckboxChange = async (id, doneTimestamp) => {
    try {
      const newVal = await this.toggleTaskStatus(id);
      this.setDoneTimestamp(id, newVal, doneTimestamp);
    } catch (e) {
      throw new Error("An error occured while handling checkbox change");
    }
  };

  addPokemonItem = async (pokemon) => {
    try {
      return await this.addItem({
        task: `Catch ${pokemon.name}`,
        isDone: false,
        imgUrl: pokemon.sprites.front_default,
      });
    } catch (e) {
      throw new Error("An error occured while adding pokemon to the list", ex);
    }
  };

  fetchAndAddPokemon = async (pokemonId) => {
    try {
      const pokemon = await this.pokemonClient.getPokemon(pokemonId);
      const newItem = await this.addPokemonItem(pokemon);
      return newItem;
    } catch (error) {
      if (error.message === "Failed to fetch pokemon") {
        const newItem = await this.addItem({
          task: `Pokemon with ID ${pokemonId} was not found`,
          isDone: false,
          imgUrl: img,
        });
        return newItem;
      } else {
        throw new Error("An error occurred while fetching pokemon");
      }
    }
  };

  fetchAndAddManyPokemon = async (inputValue) => {
    try {
      const pokemons = await this.pokemonClient.getManyPokemon(
        inputValue.replace("/ /g", "").split(",")
      );

      const result = await pokemons.map(await this.addPokemonItem);

      return result;
    } catch (error) {
      await this.addItem({
        task: `Failed to fetch pokemon with this input: ${inputValue}`,
        isDone: false,
      });
    }
  };

  deleteItem = async (taskContent) => {
    try {
      await Items.destroy({ where: { taskContent } });
    } catch (e) {
      throw new Error("An error occurred while deleting item");
    }
  };

  deleteAllItems = async () => {
    try {
      await Items.destroy({ where: {} });
    } catch (e) {
      throw new Error("An error occurred when deleting all items");
    }
  };

  _isNumber = (value) => !isNaN(Number(value));

  _isList = (value) => value.split(",").every(this._isNumber);
}

module.exports = new ItemManager();

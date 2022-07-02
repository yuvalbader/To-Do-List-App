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
      throw e;
    }
  };

  getDoneItems = async () => {
    try {
      return await Items.findAll({ where: { isDone: true } });
    } catch (err) {
      throw e;
    }
  };

  getUnDoneItems = async () => {
    try {
      return await Items.findAll({ where: { isDone: false } });
    } catch (err) {
      throw e;
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

      return await this.addItem({ task: item, isDone: false, imgUrl: "" });
    } catch (err) {
      console.log("3", err);
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
        console.log("4", item);
        await Items.bulkCreate([
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
      console.log(e);
    }
  };

  handleCheckboxChange = async (id, doneTimestamp) => {
    try {
      const newVal = await this.toggleTaskStatus(id);
      this.setDoneTimestamp(id, newVal, doneTimestamp);
    } catch (e) {
      throw e;
    }
  };

  addPokemonItem = async (pokemon) => {
    try {
      await this.addItem({
        task: `Catch ${pokemon.name}`,
        isDone: false,
        imgUrl: pokemon.sprites.front_default,
      });
    } catch (e) {
      throw e;
    }
  };

  fetchAndAddPokemon = async (pokemonId) => {
    try {
      const pokemon = await this.pokemonClient.getPokemon(pokemonId);
      await this.addPokemonItem(pokemon);
    } catch (error) {
      if (error.message === "Failed to fetch pokemon") {
        await this.addItem({
          task: `Pokemon with ID ${pokemonId} was not found`,
          isDone: false,
          imgUrl: null,
        });
      } else {
        throw error;
      }
    }
  };

  fetchAndAddManyPokemon = async (inputValue) => {
    try {
      const pokemons = await this.pokemonClient.getManyPokemon(
        inputValue.replace("/ /g", "").split(",")
      );
      pokemons.forEach(this.addPokemonItem);
    } catch (error) {
      console.error("1", error);
      await this.addItem({
        task: `Failed to fetch pokemon with this input: ${inputValue}`,
        isDone: false,
      });
    }
  };

  deleteItem = async (id) => {
    try {
      await Items.destroy({ where: { id } });
    } catch (e) {
      console.log(e);
    }
  };

  deleteAllItems = async () => {
    try {
      await Items.destroy({ where: {} });
    } catch (e) {
      console.log(e);
    }
  };

  _isNumber = (value) => !isNaN(Number(value));

  _isList = (value) => value.split(",").every(this._isNumber);
}

module.exports = new ItemManager();

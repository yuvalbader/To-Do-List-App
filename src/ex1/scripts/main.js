import ListRender from "./ListRender.js";
import ItemManager from "./ItemManager.js";
import Task from "./Task.js";
import PokemonClient from "./PokemonClient.js";
import Pokemon from "./Pokemon.js";

class Main {
  constructor() {
    this.tasksManager = new ItemManager();
    this.ListRender = new ListRender(
      this.tasksManager,
      this.tasksManager.getItems()
    );
    this.pokemonFetcher = new PokemonClient();
    this.inputBox = document.querySelector(".add-new-input");
    this.addTaskBtn = document.querySelector(".add-new-button");
  }

  init() {
    this.ListRender.renderList(this.tasksManager.getItems());

    this.addTaskBtn.addEventListener("click", async () => {
      let userValue = this.inputBox.value;

      if (userValue.trim() === "") {
        alert("Please enter a valid input");
      } else {
        if (this.isOnlyNumbers(userValue)) {
          const parsedInput = this.parseUserInputToIds(userValue);
          try {
            const pokemons = await this.pokemonFetcher.fetchPokemonsById(
              parsedInput
            );
            this.addPokemonsToList(pokemons);
            this.inputBox.value = "";
            this.ListRender.renderList(this.tasksManager.getItems());
          } catch (e) {}
        } else {
          this.tasksManager.addItem(
            new Task(userValue, this.getNowTime(), false)
          );
          this.ListRender.renderList(this.tasksManager.getItems());
        }
      }
    });

    this.inputBox.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.addTaskBtn.click();
      }
    });
  }

  addPokemonsToList(pokemons) {
    console.log(pokemons);
    pokemons.forEach((pokemon) => {
      this.tasksManager.addItem(new Pokemon(pokemon.name, pokemon.id));
    });
  }

  createPokemonNotFoundMsg(pokemonId) {
    return `Pokemon with ID ${pokemonId} was not found`;
  }

  isOnlyNumbers(userValue) {
    const regex = /^[\d,]+$/;
    return regex.test(userValue);
  }

  parseUserInputToIds(userInput) {
    return userInput.split(",");
  }

  getNowTime() {
    var today = new Date();
    var nowtime =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();
    return nowtime;
  }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});

import chalk from "chalk";
import { Command } from "commander";
import dotenv from "dotenv";
import { PokemonClient } from "../ex1/scripts/Services/PokemonClient.mjs";
import FileManager from "./FileManager.js";
import { Task } from "../ex1/scripts/Objects/Task.mjs";
import { Pokemon } from "../ex1/scripts/Objects/Pokemon.js";
import { getCipherInfo } from "crypto";

const pokemonClient = new PokemonClient();
const fileManager = new FileManager();

function isOnlyNumbers(userValue) {
  const regex = /^[\d,]+$/;
  return regex.test(userValue);
}

function parseUserInputToIds(userInput) {
  return userInput.split(",");
}

const program = new Command();

program
  .name("Todo list app")
  .description("The best Todo App in the world")
  .version("1.0.0");

program
  .command("add")
  .description("Add a new todo to list")
  .argument("<string>", "task To Add")
  .action(async (userInput, options) => {
    if (userInput.trim() === "") {
      console.log("please enter valid input");
    } else {
      if (isOnlyNumbers(userInput)) {
        const parsedInput = parseUserInputToIds(userInput);
        try {
          const pokemons = await pokemonClient.fetchPokemonsById(parsedInput);
          addPokemonsToList(pokemons);
          console.log("New todo added succssefully");

          //   fileManager.addTaskToFile(new Task(taskToAdd, false));
        } catch (e) {
          console.log(e);
        }
      } else {
        fileManager.addTaskToFile(new Task(userInput, false));
        console.log("New todo added succssefully");
      }
    }
  });

program
  .command("get")
  .description("Get all todos")
  // .argument("<string>", "task To Add")
  .action(() => {
    fileManager.printTasksFromFile();
  });

program.parse();

function addPokemonsToList(pokemons) {
  pokemons.forEach((pokemon) => {
    if (pokemon.name) {
      fileManager.addTaskToFile(
        new Pokemon(pokemon.name, pokemon.id, pokemon.types[0].type.name)
      );
    } else {
      fileManager.addTaskToFile(
        new Task(`Pokemon with ID ${pokemon} was not found`, false)
      );
    }
  });
}

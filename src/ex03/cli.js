import chalk from "chalk";
import FileManager from "./FileManager.js";
import Image from "ascii-art-image";
import { Command } from "commander";
import { PokemonClient } from "../ex1/scripts/Services/PokemonClient.mjs";
import { Task } from "../ex1/scripts/Objects/Task.mjs";
import { Pokemon } from "../ex1/scripts/Objects/Pokemon.js";

const pokemonClient = new PokemonClient();
const fileManager = new FileManager();

function isOnlyNumbersAndCommas(userValue) {
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
  .alias("a")
  .description("Add a new todo to list")
  .argument("<string>", "task To Add")
  .action(async (userInput) => {
    if (userInput.trim() === "") {
      console.log("please enter valid input");
    } else {
      if (isOnlyNumbersAndCommas(userInput)) {
        const parsedInput = parseUserInputToIds(userInput);
        try {
          const pokemons = await pokemonClient.fetchPokemonsById(parsedInput);
          addPokemonsToList(pokemons);
          console.log(chalk.green("New todo added succssefully"));
        } catch (e) {
          console.log(e);
        }
      } else {
        fileManager.addTaskToFile(new Task(userInput, false));
        console.log(chalk.green("New todo added succssefully"));
      }
    }
  });

program
  .command("image")
  .alias("img")
  .description("Get a picture of the Pokemon that will put in his Id")
  .argument("<Number>", "Id")
  .action(async (id) => {
    var image = new Image({
      filepath: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      alphabet: "blocks",
      width: 50,
      heigth: 50,
    });

    image.write(function (err, rendered) {
      console.log(rendered);
    });
  });

program
  .command("get")
  .alias("g")
  .description("Get all todos")
  .option("-c, --completed", "get completed tasks")
  .option("-u, --uncompleted", "get uncompleted tasks")
  .action((options) => {
    try {
      fileManager.printTasks(options);
    } catch (e) {
      console.log(chalk.red(e));
    }
  });

program
  .command("set-as-complete")
  .alias("c")
  .description("Set a task as complete")
  .argument("<Number>", "task To Complete")
  .action((taskToCompleteIdx) => {
    fileManager.setAsComplete(taskToCompleteIdx);
  });

program
  .command("delete")
  .alias("d")
  .description("delete a specific task")
  .argument("<Number>", "task To delete")
  .action((taskToRemove) => {
    fileManager.removeTaskFromFile(taskToRemove);
    console.log(chalk.red("todo deleted succssefully"));
  });

program
  .command("delete-all")
  .alias("da")
  .description("delete all tasks")
  .action(() => {
    fileManager.deleteAll();
    console.log(chalk.red("All tasks deleted succssefully"));
  });

program.parse();


const addPokemonsToList = async (pokemons) => {
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
};
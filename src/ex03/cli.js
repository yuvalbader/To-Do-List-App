// import chalk from "chalk";
import { Command } from "commander";
import dotenv from "dotenv";
// import { fetchPokemonsById } from "../ex1/scripts/Services/PokemonClient.js";
// const PokemonClient = require("../ex1/scripts/Services/PokemonClient");

dotenv.config();

const program = new Command();

program
  .name("Todo list app")
  .description("The best Todo App in the world")
  .version("1.0.0");

program
  .command("add")
  .description("Add a new todo to list")
  .argument("<string>", "task To Add")
  //   .option("-s, --scale <string>", "Scale", "c")
  .action((taskToAdd, options) => {
    console.log(taskToAdd);
  });

program.parse();

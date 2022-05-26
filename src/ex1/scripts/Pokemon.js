export default class Pokemon {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.task = this.createPokemonTask();
  }

  createPokemonTask() {
    return `catch ${this.name}`;
  }
}

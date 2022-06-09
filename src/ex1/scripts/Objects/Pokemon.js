
class Pokemon {
  constructor(name, id, type){
    this.name = name;
    this.id = id;
    this.type = type;
    this.checked = false;
    this.task = this.createPokemonTask();
  }

  createPokemonTask() {
    return `Catch ${this.name} (${this.type} pokemon) `;
  }
}

module.exports = { Pokemon };

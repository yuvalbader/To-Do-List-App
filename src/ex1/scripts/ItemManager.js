export default class ItemManager {
  constructor() {
    {
      this.items = this.loadItemsFromLocalStorage();
    }
  }
  addItem(itemToAdd) {
    this.items.push(itemToAdd);
    localStorage.setItem(
      "items",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("items") || "[]"),
        itemToAdd,
      ])
    );
  }

  removeItem(itemToRemoveIdx) {
    this.items.splice(itemToRemoveIdx, 1);
    localStorage.setItem("items", JSON.stringify(this.items));
  }

  loadItemsFromLocalStorage() {
    return Array.from(JSON.parse(localStorage.getItem("items")) || []);
  }

  getItems() {
    return this.items;
  }
}

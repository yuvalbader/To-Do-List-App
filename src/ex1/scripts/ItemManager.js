export default class ItemManager {
  constructor() {
    {
      this.itemsArr = this.loadItemsFromLocalStorage();
    }
  }

  addItem(itemToAdd) {
    this.itemsArr.push(itemToAdd);
    localStorage.setItem(
      "items",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("items") || "[]"),
        itemToAdd,
      ])
    );
  }

  removeItem(itemToRemove) {
    const index = itemToRemove;
    this.itemsArr.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(this.itemsArr));
  }

  loadItemsFromLocalStorage() {
    try {
      return Array.from(JSON.parse(localStorage.getItem("items")));
    } catch (e) {
      return [];
    }
  }

  getItems() {
    return this.itemsArr;
  }

  deleteAllItems() {
    this.itemsArr = [];
  }
}

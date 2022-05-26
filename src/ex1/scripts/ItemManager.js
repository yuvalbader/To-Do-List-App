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
    return Array.from(JSON.parse(localStorage.getItem("items")) || []);
  }

  getItems() {
    return this.itemsArr;
  }
}

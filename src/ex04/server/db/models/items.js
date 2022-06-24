"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Items.init(
    {
      taskContent: DataTypes.STRING,
      IsDone: DataTypes.BOOLEAN,
      done_timestamp: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Items",
      tableName: "Items",
    }
  );
  Items.removeAttribute("id");
  return Items;
};

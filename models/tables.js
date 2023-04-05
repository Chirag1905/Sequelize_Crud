"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tables extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({  }) {
      // define association here
      
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Tables.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: { type: DataTypes.STRING, allowNull: false },
      desc: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Tables",
    }
  );
  return Tables;
};

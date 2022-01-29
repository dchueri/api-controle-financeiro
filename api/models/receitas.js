'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receitas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Receitas.init({
    categoria: DataTypes.STRING,
    descricao: DataTypes.STRING,
    valor: DataTypes.DOUBLE,
    data: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Receitas',
  });
  return Receitas;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    product_name: DataTypes.STRING,
    product_price: DataTypes.INTEGER,
    product_quantity: DataTypes.INTEGER,
    product_status: DataTypes.INTEGER,
    product_brand: DataTypes.INTEGER,
    product_category: DataTypes.INTEGER,
    product_size: DataTypes.INTEGER,
    product_des: DataTypes.TEXT,
    product_image: DataTypes.BLOB('long'),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
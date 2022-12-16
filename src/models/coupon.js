'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Coupon.init({
    coupon_name: DataTypes.STRING,
    coupon_start: DataTypes.DATE,
    coupon_end: DataTypes.DATE,
    coupon_type: DataTypes.INTEGER,
    coupon_value: DataTypes.INTEGER,
    coupon_code: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Coupon',
  });
  return Coupon;
};
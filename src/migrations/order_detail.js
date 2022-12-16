'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_detail', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      coupon_id: {
        type: Sequelize.INTEGER
      },
      coupon_name: {
        type: Sequelize.STRING
      },
      coupon_start: {
        type: Sequelize.DATE
      },
      coupon_end: {
        type: Sequelize.DATE
      },
      coupon_type: {
        type: Sequelize.INTEGER
      },
      coupon_value: {
        type: Sequelize.INTEGER
      },
      coupon_code: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_detail');
  }
};
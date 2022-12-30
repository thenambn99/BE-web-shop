'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      product_price: {
        type: Sequelize.INTEGER
      },
      product_status: {
        type: Sequelize.INTEGER
      },
      product_brand: {
        type: Sequelize.INTEGER
      },
      product_category: {
        type: Sequelize.INTEGER
      },
      product_des: {
        type: Sequelize.TEXT
      },
      product_image: {
        type: Sequelize.BLOB('long')
      },
      product_type: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Product');
  }
};
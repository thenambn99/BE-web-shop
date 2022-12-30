import db from "../models/index";

const getBrandsById = async (data) => {
  try {
    let res = {};
    const brandList = await db.Brand.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        category_id: data.id,
      },
      raw: true,
      nest: true,
    });
    if (brandList) {
      return (res = {
        message: "Get brands success",
        result: brandList,
        success: true,
      });
    } else
      return (res = {
        message: "Get brands fail",
        success: false,
      });
  } catch (e) {
    console.log(e);
  }
};

const updateBrand = async (data) => {
  let res = {};
  try {
    const category = await db.Brand.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        id: data.id,
      },
      raw: true,
      nest: true,
    });
    if (category) {
      await db.Brand.update(
        {
          brand_name: data.value,
        },
        {
          where: { id: data.id },
        }
      );
      return (res = {
        message: "Update brand success",
        success: true,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const createBrand = async (data) => {
  let res = {};
  try {
    if (data) {
      const result = await db.Brand.create({
        brand_name: data.brand_name,
        category_id: data.category_id,
      });
      if (result) {
        return (res = {
          message: "Create brand success",
          success: true,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteBrand = async (data) => {
  let res = {};
  try {
    const brand = await db.Brand.destroy({
      where: {
        id: data.id,
      },
    });
    if (brand) {
      return (res = {
        message: "Delete brand successed",
        success: true,
      });
    } else {
      return (res = {
        message: "Delete brand failed",
        success: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const getAllBrands = async () => {
  let res = {};
  try {
    const brandList = await db.Brand.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
      nest: true,
    });
    if (brandList) {
      return res = {
        message: "Get all brand success",
        success: true,
        result: brandList
      }
    } else {
      return res = {
        message: "Get all brand failed",
        success: false,
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getBrandsById: getBrandsById,
  updateBrand: updateBrand,
  createBrand: createBrand,
  deleteBrand: deleteBrand,
  getAllBrands: getAllBrands,
};

import db from "../models/index";

const getAllCategories = async () => {
  let res = {};
  try {
    const category = await db.Category.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
      nest: true,
    });
    const brand = await db.Brand.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
      nest: true,
    });
    const data = category.map((category) => {
      return {
        ...category,
        brands: brand.filter((e) => e.category_id === category.id)
      }
    })

    return (res = {
      message: "Get categories success",
      success: true,
      result: data,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllCategories: getAllCategories,
};

import db from "../models/index";

const getAllCategories = async () => {
  let res = {};
  try {
    const category = await db.Category.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
      nest: true,
    });
    return (res = {
      message: "Get categories success",
      success: true,
      result: category,
    });
  } catch (e) {
    console.log(e);
  }
};

const updateCategory = async (data) => {
  let res = {};
  try {
    const category = await db.Category.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        id: data.id,
      },
      raw: true,
      nest: true,
    });
    if (category) {
      await db.Category.update(
        {
          category_name: data.value,
        },
        {
          where: { id: data.id },
        }
      );
      return res = {
        message: "Update category success",
        success: true
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const createCategory = async (data) => {
  let res = {};
  try {
    if (data) {
      const result = await db.Category.create({
        category_name: data.category_name
      })
      if (result) {
        return res = {
          message: "Create category success",
          success: true
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteCategory = async (data) => {
  let res = {}
  try {
    const category = await db.Category.destroy({
      where: {
        id: data.id
      }
    })
    if (category) {
      return res = {
        message: "Delete category successed",
        success: true
      }
    } else {
      return res = {
        message: "Delete category failed",
        success: false
      }
    }
  }
  catch (e) {
    console.log(e)
  }
}

module.exports = {
  getAllCategories: getAllCategories,
  updateCategory: updateCategory,
  createCategory: createCategory,
  deleteCategory: deleteCategory
};

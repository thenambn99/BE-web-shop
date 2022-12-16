import db from "../models/index";

const createProduct = async (data) => {
  try {
    await db.Product.create({
      product_name: data.product_name,
      product_price: data.product_price,
      product_quantity: data.product_quantity,
      product_status: data.product_status,
      brand_id: data.brand_id,
      category_id: data.category_id,
      category_child_id: data.category_child_id,
      product_image: data.product_image,
    });
  } catch (e) {
    console.log(e);
  }
};

const editProduct = async (id) => {
  try {
    const data = await db.Product.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        id: id,
      },
      raw: true,
      nest: true,
    });
    return {
      result: data,
    };
  } catch (e) {
    console.log(e);
  }
};

const getCategoryList = async () => {
  try {
    const data = await db.Category.findAll({
      attributes: { exclude: ["created_at", "updated_at"] },
      raw: true,
      nest: true,
    });
    return {
      result: data,
    };
  } catch (e) {
    console.log(e);
  }
};

const getBrandByCategoryId = async (category_child_id) => {
  try {
    if (!category_child_id) {
      return {
        errCode: 1,
        errMessage: "Missing required parameter",
      };
    } else {
      const data = await db.Brand.findAll({
        attributes: { exclude: ["created_at", "updated_at"] },
        where: {
          category_child_id: category_child_id,
        },
        // include: [
        //   {model: db.Brand}
        // ],
        raw: true,
        nest: true,
      });
      return {
        result: data,
      };
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getCategoryChild = async (category_id) => {
  try {
    if (!category_id) {
      return {
        errCode: 1,
        errMessage: "Missing required parameter",
      };
    } else {
      const data = await db.ChildCategory.findAll({
        attributes: { exclude: ["created_at", "updated_at"] },
        where: {
          category_id: category_id,
        },
        // include: [
        //   {model: db.CategoryChild}
        // ],
        raw: true,
        nest: true,
      });
      return {
        result: data,
      };
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}

module.exports = {
  getBrandByCategoryId: getBrandByCategoryId,
  getCategoryList: getCategoryList,
  createProduct: createProduct,
  editProduct: editProduct,
  getCategoryChild: getCategoryChild,
};

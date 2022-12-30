import db from "../models/index";

const updateProduct = async (data) => {
  let res = {};
  try {
    if (!data?.product_id) {
      const product = await db.Product.create({
        product_name: data.product_name,
        product_price: data.product_price,
        product_status: data.product_status,
        product_brand: data.product_brand,
        product_type: data.product_type,
        product_category: data.product_category,
        product_des: data.product_des,
        product_image: data.product_image,
      });
      if (product) {
        data.product_detail.map(async (e) => {
          const detail = await db.ProductDetail.create({
            product_id: product.dataValues.id,
            product_quantity: e.product_quantity,
            product_size: e.product_size,
          });
        });
        return (res = {
          message: "Update product success",
          success: true,
        });
      } else {
        return (res = {
          message: "Update product failed",
          success: false,
        });
      }
    } else {
      const product = await db.Product.findOne({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          id: Number(data.product_id),
        },
        raw: true,
        nest: true,
      });
      if (product) {
        await db.Product.update(
          {
            product_name: data.product_name,
            product_price: data.product_price,
            product_status: data.product_status,
            product_brand: data.product_brand,
            product_type: data.product_type,
            product_category: data.product_category,
            product_des: data.product_des,
            product_image: data.product_image ? data.product_image : product.product_image,
          },
          {
            where: { id: data.product_id },
          }
        );
        data.product_detail.map(async (e) => {
          await db.ProductDetail.update(
            {
              product_quantity: e.product_quantity,
              product_size: e.product_size,
            },
            {
              where: { id: e.id },
            }
          );
        });
        return (res = {
          message: "Update product success",
          success: true,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const getProductList = async () => {
  let res = {};
  try {
    const list = await db.Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
      nest: true,
    });

    if (list) {
      return (res = {
        message: "Get product list success",
        success: true,
        result: list,
      });
    } else {
      return (res = {
        message: "Get product list failed",
        success: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const getProductById = async (id) => {
  let res = {};
  try {
    const product = await db.Product.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt", ],
      },
      where: {
        id: id,
      },
      raw: true,
      nest: true,
    });
    
    const detail = await db.ProductDetail.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", ] },
      raw: true,
      nest: true,
    });
    const data = {
      ...product,
      product_detail: detail.filter((d) => d.product_id === Number(id))
    }
    if (product && detail) {
      return res = {
        message: 'Get product success',
        success: true,
        result: data
      }
    } else {
      return res = {
        message: 'Get product failed',
        success: false,
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteProduct = async (data) => {
  let res ={}
  try {
    const product = await db.Product.destroy({
      where: {
        id: data.id
      }
    })
    if (product) {
      return res = {
        message: "Delete product successed",
        success: true
      }
    } else {
      return res = {
        message: "Delete product failed",
        success: false
      }
    }
  }
  catch (e) {
    console.log(e)
  }
}

module.exports = {
  updateProduct: updateProduct,
  getProductList: getProductList,
  getProductById: getProductById,
  deleteProduct: deleteProduct,
};

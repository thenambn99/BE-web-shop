import productService from "../services/productService";

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body)
    return res.status(200).json({
      errCode: 0,
      errMessage: "Ok",
    })
  }
  catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const product = await productService.editProduct(req.query.id)
    return res.status(200).json(product);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
}

const getCategoryList = async (req, res) => {
  try {
    const listCategory = await productService.getCategoryList();
    return res.status(200).json(listCategory);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

const getBrandByCategoryId = async (req, res) => {
  try {
    const listBrand = await productService.getBrandByCategoryId(req.query.id);
    return res.status(200).json(listBrand);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

const getCategoryChild = async (req, res) => {
  try {
    const listCategoryChild = await productService.getCategoryChild(req.query.id)
    return res.status(200).json(listCategoryChild)
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
}

module.exports = {
  createProduct: createProduct,
  getBrandByCategoryId: getBrandByCategoryId,
  getCategoryList:getCategoryList,
  editProduct: editProduct,
  getCategoryChild: getCategoryChild,
};

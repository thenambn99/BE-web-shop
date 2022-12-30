import productService from "../services/productService";

const updateProduct = async (req, res) => {
  try {
    const response = await productService.updateProduct(req.body)
    return res.status(200).json({
      message: response.message,
      success: response.success,
    })
  }
  catch {
    return res.status(500).json({
      message: 'Error from server'
    })
  }
}

const getProductList = async (req, res) => {
  try {
    const response = await productService.getProductList(req.body)
    return res.status(200).json({
      message: response.message,
      success: response.success,
      result: response.result
    })
  }
  catch {
    return res.status(500).json({
      message: 'Error from server'
    })
  }
}

const getProductById = async (req, res) => {
  try {
    const response = await productService.getProductById(req.query.id)
    return res.status(200).json({
      message: response.message,
      success: response.success,
      result: response.result
    })
  }
  catch {
    return res.status(500).json({
      message: 'Error from server'
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const response = await productService.deleteProduct(req.body)
    return res.status(200).json({
      message: response.message,
      success: response.success,
    })
  }
  catch {
    return res.status(500).json({
      message: 'Error from server'
    })
  }
}

module.exports = {
  updateProduct: updateProduct,
  getProductList: getProductList,
  getProductById: getProductById,
  deleteProduct: deleteProduct,
};

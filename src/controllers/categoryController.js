import categoryService from '../services/categoryService'

const getAllCategories = async (req, res) => {
  try {
    const response = await categoryService.getAllCategories()
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

module.exports = {
  getAllCategories: getAllCategories,
}
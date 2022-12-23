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

const updateCategory = async (req, res) => {
  try {
    const response = await categoryService.updateCategory(req.body)
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

const createCategory = async (req, res) => {
  try {
    const response = await categoryService.createCategory(req.body)
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

const deleteCategory = async (req, res) => {
  try {
    const response = await categoryService.deleteCategory(req.body)
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
  getAllCategories: getAllCategories,
  updateCategory: updateCategory,
  createCategory: createCategory,
  deleteCategory: deleteCategory
}
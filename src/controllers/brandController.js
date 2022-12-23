import brandService from "../services/brandService"

const getBrandsById = async (req, res) => {
  try {
    const response = await brandService.getBrandsById(req.body)
    if (response) {
      return res.status(200).json({
        message: response.message,
        success: response.success,
        result: response.result
      })
    }
  }
  catch {
    return res.status(500).json({
      message: 'Error from server'
    })
  }
}

const updateBrand = async(req, res) => {
  try {
    const response = await brandService.updateBrand(req.body)
    if (response) {
      return res.status(200).json({
        message: response.message,
        success: response.success,
      })
    }
  }
  catch {
    return res.status(500).json({
      message: 'Error from server'
    })
  }
}

const createBrand = async(req, res) => {
  try {
    const response = await brandService.createBrand(req.body)
    if (response) {
      return res.status(200).json({
        message: response.message,
        success: response.success,
      })
    }
  }
  catch {
    return res.status(500).json({
      message: 'Error from server'
    })
  }
}

const deleteBrand = async(req, res) => {
  try {
    const response = await brandService.deleteBrand(req.body)
    if (response) {
      return res.status(200).json({
        message: response.message,
        success: response.success,
      })
    }
  }
  catch {
    return res.status(500).json({
      message: 'Error from server'
    })
  }
}

module.exports = {
  getBrandsById: getBrandsById,
  updateBrand: updateBrand,
  createBrand: createBrand,
  deleteBrand: deleteBrand,
}
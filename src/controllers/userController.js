import userService from '../services/userService'

const handleLogin = async (req, res) => {
  try {
    const response = await userService.handleLogin(req.body)
    return res.status(200).json({
      message: response.message,
      success: response.success,
      result: response.result,
      accessToken : response.accessToken
    })
  }
  catch (err) {
    return res.status(500).json({
      message: 'Error from server'
    })
  }
}

const handleRegister = async (req, res) => {
  try {
    const response = await userService.handleRegister(req.body)
    return res.status(200).json({
      message: response.message,
      success: response.success
    })
  }
  catch (err) {
    return res.status(500).json({
      message: 'Error from server'
    })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const response = await userService.getAllUsers()
    return res.status(200).json({
      message: response.message,
      success: response.success,
      result: response.result
    })
  }
  catch (err) {
    return res.status(500).json({
      message: 'Error from server'
    })
  }
}

module.exports = {
  handleLogin: handleLogin,
  handleRegister: handleRegister,
  getAllUsers: getAllUsers,
}
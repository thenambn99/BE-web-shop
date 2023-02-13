import orderService from '../services/orderService'


const createOrder = async (req, res) => {
  try {
    const response = await orderService.createOrder(req.body)
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

const getAllOrders = async (req, res) => {
  try {
    const response = await orderService.getAllOrders()
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

const changeOrderStatus = async (req, res) => {
  try {
    const response = await orderService.changeOrderStatus(req.body)
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

const deleteOrder = async (req, res) => {
  try {
    const response = await orderService.deleteOrder(req.body)
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

const getPaymentList = async (req, res) => {
  try {
    const response = await orderService.getPaymentList(req.body)
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

const getOrderDetail = async (req, res) => {
  try {
    const response = await orderService.getOrderDetail(req.body)
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

const cancelOrder = async (req, res) => {
  try {
    const response = await orderService.cancelOrder(req.body)
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
  createOrder: createOrder,
  getAllOrders: getAllOrders,
  changeOrderStatus: changeOrderStatus,
  deleteOrder: deleteOrder,
  getPaymentList: getPaymentList,
  getOrderDetail: getOrderDetail,
  cancelOrder: cancelOrder
}
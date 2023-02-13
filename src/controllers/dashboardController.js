import dashboardService from "../services/dashboardService"

const getDashboardData = async (req, res) => {
  try {
    const response = await dashboardService.getDashboardData()
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
  getDashboardData: getDashboardData,
}
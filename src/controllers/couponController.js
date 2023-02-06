import couponService from "../services/couponService";

const updateCoupon = async (req, res) => {
  try {
    const response = await couponService.updateCoupon(req.body);
    return res.status(200).json({
      message: response.message,
      success: response.success,
    });
  } catch {
    return res.status(500).json({
      message: "Error from server",
    });
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const response = await couponService.getAllCoupons();
    return res.status(200).json({
      message: response.message,
      success: response.success,
      result: response.result
    });
  } catch {
    return res.status(500).json({
      message: "Error from server",
    });
  }
}

module.exports = {
  updateCoupon: updateCoupon,
  getAllCoupons: getAllCoupons,
};

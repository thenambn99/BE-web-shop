import db from "../models/index";

const getAllCoupons = async () => {
  let res = {};
  try {
    const coupons = await db.Coupon.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
      nest: true,
    });
    return (res = {
      message: "Get coupons success",
      success: true,
      result: coupons,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteCoupon = async (data) => {
  let res = {};
  try {
    const coupon = await db.Coupon.destroy({
      where: { id: data.id },
    });
    if (coupon) {
      return (res = {
        message: "Delete coupon successed",
        success: true,
      });
    } else {
      return (res = {
        message: "Delete coupon failed",
        success: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const updateCoupon = async (data) => {
  let res = {};
  try {
    if (data.id) {
      await db.Coupon.update(
        {
          coupon_name: data.coupon_name,
          coupon_start: data.coupon_start,
          coupon_end: data.coupon_end,
          coupon_type: data.coupon_type,
          coupon_value: data.coupon_value,
          coupon_code: data.coupon_code,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      return (res = {
        message: "Update coupon success",
        success: true,
      });
    }
    if (!data.id) {
      await db.Coupon.create({
        coupon_name: data.coupon_name,
        coupon_start: data.coupon_start,
        coupon_end: data.coupon_end,
        coupon_type: data.coupon_type,
        coupon_value: data.coupon_value,
        coupon_code: data.coupon_code,
      });
      return (res = {
        message: "Create coupon success",
        success: true,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const getCouponByCode = async (data) => {
  let res = {};
  try {
    const coupon = await db.Coupon.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        coupon_code: data.code,
      },
      raw: true,
      nest: true,
    });
    if (coupon) {
      return (res = {
        message: "Get coupon success",
        success: true,
        result: coupon
      });
    } else {
      return res = {
        message: "Get coupon failed",
        success: false,
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  updateCoupon: updateCoupon,
  getAllCoupons: getAllCoupons,
  deleteCoupon: deleteCoupon,
  getCouponByCode: getCouponByCode,
};

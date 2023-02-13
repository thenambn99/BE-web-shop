import db from "../models/index";

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const createOrder = async (data) => {
  let res = {};
  let code = makeid(5);
  try {
    const order = await db.Order.create({
      user_id: data.user_id,
      order_date: data.order_date,
      order_status: data.order_status,
      total_price: data.total_price,
      order_code: code,
    });
    if (order) {
      data.cart.map(async (p) => {
        await db.OrderDetail.create({
          order_id: order.dataValues.id,
          product_id: p.product_id,
          product_quantity: p.product_quantity,
          product_size: p.product_size,
        });
      });
      return (res = {
        message: "Create order success",
        success: true,
      });
    } else {
      return (res = {
        message: "Create order failed",
        success: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const getAllOrders = async () => {
  let res = {};
  try {
    const list = await db.Order.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
      nest: true,
    });
    const users = await db.User.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
      nest: true,
    });
    if (list && users) {
      const userList = users.filter((u) =>
        list.some((l) => u.id === l.user_id)
      );
      const data = list.map((l, i) => {
        const user = userList.find((u) => u.id === l.user_id);
        if (user) {
          return {
            ...l,
            user_name: user.name,
            user_address: user.address,
          };
        }
      });
      return (res = {
        message: "Get order list success",
        success: true,
        result: data,
      });
    } else {
      return (res = {
        message: "Get order list failed",
        success: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const changeOrderStatus = async (data) => {
  let res = {};
  try {
    const order = await db.Order.update(
      {
        order_status: data.order_status,
      },
      {
        where: { id: data.id },
      }
    );
    if (data.order_status === 2) {
      const orderDetail = await db.OrderDetail.findAll({
        where: { order_id: data.id },
      });
      orderDetail.map(async (e) => {
        const detail = await db.ProductDetail.findOne({
          where: {
            product_id: e.product_id,
            product_size: e.product_size
          }
        })
        const productDetail = await db.ProductDetail.update({
          product_quantity: detail.product_quantity - e.product_quantity
        }, {
          where: {
            product_id: e.product_id,
            product_size: e.product_size 
          }
        });
      })
    }
    if (data.order_status === 5) {
      const orderDetail = await db.OrderDetail.findAll({
        where: { order_id: data.id },
      });
      orderDetail.map(async (e) => {
        const detail = await db.ProductDetail.findOne({
          where: {
            product_id: e.product_id,
            product_size: e.product_size
          }
        })
        const productDetail = await db.ProductDetail.update({
          product_quantity: detail.product_quantity + e.product_quantity
        }, {
          where: {
            product_id: e.product_id,
            product_size: e.product_size 
          }
        });
      })
    }
    if (order) {
      return (res = {
        message: "Change order status success",
        success: true,
      });
    } else {
      return (res = {
        message: "Change order status failed",
        success: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteOrder = async (data) => {
  let res = {};
  try {
    const order = await db.Order.destroy({
      where: { id: data.id },
    });
    const orderDetail = await db.OrderDetail.destroy({
      where: { order_id: data.id },
    });
    if (order && orderDetail) {
      return (res = {
        message: "Delete order success",
        success: true,
      });
    } else {
      return (res = {
        message: "Delete order failed",
        success: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const getPaymentList = async (data) => {
  let res = {};
  try {
    const payment = await db.Order.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { user_id: data.user_id },
      raw: true,
      nest: true,
    });
    if (payment) {
      return (res = {
        message: "Get payment list success",
        success: true,
        result: payment,
      });
    } else {
      return (res = {
        message: "Get payment list failed",
        success: true,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const getOrderDetail = async (data) => {
  let res = {};
  try {
    const detail = await db.OrderDetail.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        order_id: data.id,
      },
      raw: true,
      nest: true,
    });
    const productList = await db.Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
      nest: true,
    });
    const result = detail.map((d) => {
      const product = productList.find((p) => p.id === d.product_id);
      if (product) {
        return {
          ...d,
          product_name: product.product_name,
          product_price: product.product_price,
          product_image: product.product_image,
        };
      }
    });
    if (result) {
      return (res = {
        message: "Get order detail success",
        success: true,
        result: result,
      });
    } else {
      return (res = {
        message: "Get order detail failed",
        success: true,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const cancelOrder = async (data) => {
  let res = {}
  try {
    const order = await db.Order.update(
      {
        order_status: 5,
      },
      {
        where: { id: data.id },
      }
    );
    if (order) {
      return (res = {
        message: "Cancel order success",
        success: true,
      });
    } else {
      return (res = {
        message: "Cancel order failed",
        success: false,
      });
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  createOrder: createOrder,
  getAllOrders: getAllOrders,
  changeOrderStatus: changeOrderStatus,
  deleteOrder: deleteOrder,
  getPaymentList: getPaymentList,
  getOrderDetail: getOrderDetail,
  cancelOrder: cancelOrder,
};

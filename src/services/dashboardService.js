import db from "../models/index";

const getDashboardData = async () => {
  let res = {};
  try {
    const userList = await db.User.findAll({
      where: { role: 1 },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
      nest: true,
    });
    const order = await db.Order.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
      nest: true,
    });
    const date = await db.Order.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      attributes: ["order_date"],
      raw: true,
      nest: true,
    });
    const dataDate = date.map((d) => d.order_date.getMonth());
    const dataTime = [
      {
        month: "Jan",
        total: dataDate.filter((d) => d === 0).length,
      },
      {
        month: "Feb",
        total: dataDate.filter((d) => d === 1).length,
      },
      {
        month: "Mar",
        total: dataDate.filter((d) => d === 2).length,
      },
      {
        month: "Apr",
        total: dataDate.filter((d) => d === 3).length,
      },
      {
        month: "May",
        total: dataDate.filter((d) => d === 4).length,
      },
      {
        month: "Jun",
        total: dataDate.filter((d) => d === 5).length,
      },
      {
        month: "Jul",
        total: dataDate.filter((d) => d === 6).length,
      },
      {
        month: "Aug",
        total: dataDate.filter((d) => d === 7).length,
      },
      {
        month: "Sep",
        total: dataDate.filter((d) => d === 8).length,
      },
      {
        month: "Oct",
        total: dataDate.filter((d) => d === 9).length,
      },
      {
        month: "Nov",
        total: dataDate.filter((d) => d === 10).length,
      },
      {
        month: "Dec",
        total: dataDate.filter((d) => d === 11).length,
      },
    ];
    const result = {
      total_users: userList.length,
      total_orders: order.length,
      total_processing: order.filter((o) => o.order_status === 3).length,
      total_completed: order.filter((o) => o.order_status === 4).length,
      total_cancelled: order.filter((o) => o.order_status === 5).length,
      total_profit: order
        .filter((o) => o.order_status === 4)
        .reduce((acc, curr) => {
          return (acc += curr.total_price);
        }, 0),
      dataTime: dataTime
    };
    if (result) {
      return res = {
        message: "Get data dashboard success",
        success: true,
        result: result
      }
    } else {
      return res = {
        message: "Get data dashboard failed",
        success: false,
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getDashboardData: getDashboardData,
};

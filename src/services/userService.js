import db from "../models/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


const handleRegister = async (data) => {
  let response = {};
  try {
    const passwordHashed = bcrypt.hashSync(data.password, salt);
    const user = await db.User.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        email: data.email,
      },
      raw: true,
      nest: true,
    });
    if (user) {
      return (response = {
        message: "Email is already in use!",
        success: true,
      });
    }
    if (
      !data.password ||
      !data.email ||
      !data.address ||
      !data.name ||
      !data.phone_number
    ) {
      return (response = {
        message: "Missing requirement",
        success: false,
      });
    } else {
      const result = await db.User.create({
        email: data.email,
        name: data.name,
        password: passwordHashed,
        phone_number: data.phone_number,
        address: data.address,
        role: data.role,
      });
      if (result) {
        return (response = {
          message: "Create user success",
          success: true,
        });
      } else {
        return (response = {
          message: "Create user not success",
          success: false,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const handleLogin = async (data) => {
  let response = {};
  try {
    if (!data.email || !data.password) {
      return (response = {
        message: "Email or password is invalid",
        success: false,
      });
    }
    const user = await db.User.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        email: data.email,
      },
      raw: true,
      nest: true,
    });
    if (!user) {
      return (response = {
        message: "Email is invalid",
        success: false,
      });
    }

    if (user.role === 1) {
      return response = {
        message: "Email or password is invalid",
        success: false
      }
    }

    const passwordIsValid = bcrypt.compareSync(data.password, user.password);
    if (!passwordIsValid) {
      return (response = {
        accessToken: null,
        message: "Invalid Password!",
        success: false,
      });
    } else {
      delete user.password;
      const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "4h",
      });
      return (response = {
        message: "Login success",
        success: true,
        result: {
          ...user,
        },
        accessToken: token,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const getAllUsers = async () => {
  let res = {};
  try {
    const users = await db.User.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      raw: true,
      nest: true,
    });
    if (users) {
      return (res = {
        result: users,
        success: true,
        message: "Get user list success",
      });
    } else {
      return (res = {
        success: false,
        message: "Get user list failed",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (data) => {
  let res = {};
  try {
    const user = await db.User.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        id: data.id,
      },
      raw: true,
      nest: true,
    });
    if (user) {
      await db.User.update(
        {
          name: data.name,
          email: data.email,
          phone_number: data.phone_number,
          address: data.address,
          role: data.role,
        },
        {
          where: { id: data.id },
        }
      );
      return (res = {
        message: "Update user successed",
        success: true,
      });
    } else {
      return (res = {
        message: "Update user failed",
        success: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async (data) => {
  let res = {}
  try {
    const user = await db.User.destroy({
      where: {
        id: data.id
      }
    })
    if (user) {
      return res = {
        message: "Delete user successed",
        success: true
      }
    } else {
      return res = {
        message: "Delete user failed",
        success: false
      }
    }
  }
  catch (e) {
    console.log(e)
  }
}

module.exports = {
  handleRegister: handleRegister,
  handleLogin: handleLogin,
  getAllUsers: getAllUsers,
  updateUser: updateUser,
  deleteUser: deleteUser,
};

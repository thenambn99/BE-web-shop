import express from 'express'
import {getHomePage} from "../controllers/homeController"
import userController from '../controllers/userController'
import productController from '../controllers/productController'
import categoryController from '../controllers/categoryController'
import brandController from '../controllers/brandController'
import couponController from '../controllers/couponController'
import orderController from "../controllers/orderController"
import dashboardController from "../controllers/dashboardController"
import { refreshToken, verifyToken } from '../middleware/authToken'
const router = express.Router()

const initWebRoutes = (app) => {

  router.get('/', getHomePage)

  // RefreshToken
  router.post('/api/refreshToken', refreshToken)
  // Login 
  router.post('/api/login', userController.handleLogin)
  router.post('/api/register', userController.handleRegister)

  // User
  router.get('/api/getAllUsers', verifyToken, userController.getAllUsers)
  router.post('/api/updateUser', verifyToken, userController.updateUser)
  router.post('/api/deleteUser', verifyToken, userController.deleteUser)

  // Categories
  router.get('/api/getAllCategories', verifyToken, categoryController.getAllCategories)
  router.post('/api/updateCategory', verifyToken, categoryController.updateCategory)
  router.post('/api/createCategory', verifyToken, categoryController.createCategory)
  router.post('/api/deleteCategory', verifyToken, categoryController.deleteCategory)

  // Brands
  router.post('/api/getBrandsById', verifyToken, brandController.getBrandsById )
  router.post('/api/updateBrand', verifyToken, brandController.updateBrand)
  router.post('/api/createBrand', verifyToken, brandController.createBrand)
  router.post('/api/deleteBrand', verifyToken, brandController.deleteBrand)
  router.get('/api/getAllBrands', verifyToken, brandController.getAllBrands)


  // ProductController
  router.post('/api/updateProduct', verifyToken, productController.updateProduct)
  router.get('/api/getProductList',  productController.getProductList)
  router.get('/api/getProductById',  productController.getProductById)
  router.post('/api/deleteProduct', verifyToken, productController.deleteProduct)


  // CouponsController
  router.post('/api/updateCoupon', verifyToken, couponController.updateCoupon)
  router.get('/api/getAllCoupons', verifyToken, couponController.getAllCoupons)
  router.post('/api/deleteCoupon', verifyToken, couponController.deleteCoupon)
  router.post('/api/getCouponByCode', verifyToken, couponController.getCouponByCode)

  // OrderController
  router.post('/api/createOrder', verifyToken, orderController.createOrder)
  router.get('/api/getAllOrders', verifyToken, orderController.getAllOrders)
  router.post('/api/changeOrderStatus', verifyToken, orderController.changeOrderStatus)
  router.post('/api/deleteOrder', verifyToken, orderController.deleteOrder)
  router.post('/api/getPaymentList', verifyToken, orderController.getPaymentList)
  router.post('/api/getOrderDetail', verifyToken, orderController.getOrderDetail)
  router.post('/api/cancelOrder', verifyToken, orderController.cancelOrder)

  // DashBoardController
  router.get('/api/getDashboardData', verifyToken, dashboardController.getDashboardData)
  return app.use("/", router)

}

export default initWebRoutes
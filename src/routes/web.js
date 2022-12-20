import express from 'express'
import {getHomePage} from "../controllers/homeController"
import userController from '../controllers/userController'
import productController from '../controllers/productController'
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
  // ProductController
  // router.post('/api/createProduct', productController.createProduct)
  // router.get('/api/editProduct', productController.editProduct)
  // router.get('/api/getProductCategory', productController.getCategoryList)
  // router.get('/api/getProductBrand', productController.getBrandByCategoryId)
  // router.get('/api/getProductCategoryChild', productController.getCategoryChild)
  return app.use("/", router)

}

export default initWebRoutes
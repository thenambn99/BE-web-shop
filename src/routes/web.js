import express from 'express'
import {getHomePage} from "../controllers/homeController"
import userController from '../controllers/userController'
import productController from '../controllers/productController'
import categoryController from '../controllers/categoryController'
import brandController from '../controllers/brandController'
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


  // ProductController
  // router.post('/api/createProduct', productController.createProduct)
  // router.get('/api/editProduct', productController.editProduct)
  // router.get('/api/getProductCategory', productController.getCategoryList)
  // router.get('/api/getProductBrand', productController.getBrandByCategoryId)
  // router.get('/api/getProductCategoryChild', productController.getCategoryChild)
  return app.use("/", router)

}

export default initWebRoutes
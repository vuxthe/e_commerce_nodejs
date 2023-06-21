import express from 'express'

import {
  getProducts,
  getProductById,
  deleteProductById,
  addProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts
} from '../controllers/productControllers.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts)
router.route('/topRated').get(getTopRatedProducts)
router.route('/add').post(addProduct)
router.route('/:id').get(getProductById)
router.route('/:id/update').put(protect, isAdmin, updateProduct)
router.route('/:id/delete').delete(protect, isAdmin, deleteProductById)
router.route('/:id/reviews').post(protect, createProductReview)

export default router

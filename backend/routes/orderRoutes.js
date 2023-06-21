import express from 'express'
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderSentPayment,
  getMyOrders,
  getAllOrders,
  deleteOrderById,
  updateOrderToDelivered
} from '../controllers/orderControllers.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getAllOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, isAdmin, updateOrderToPaid)
router.route('/:id/delivered').put(protect, isAdmin, updateOrderToDelivered)
router.route('/:id/sentpayment').put(protect, updateOrderSentPayment)
router.route('/:id/delete').delete(protect, isAdmin, deleteOrderById)


export default router

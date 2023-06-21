import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'
import  Product from '../models/productModel.js'
// GET

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async function (req, res) {
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  } else {
    res.json(order)
  }
})

// @desc    Get logged in user orders
// @route   Get /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async function (req, res) {
  const order = await Order.find({ user: req.user._id })
  res.json(order)
})

// @desc    Get all orders
// @route   Get /api/orders
// @access  Private/admin
const getAllOrders = asyncHandler(async function (req, res) {
  const order = await Order.find({}).populate('user', 'id name')
  res.json(order)
})


// POST

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async function (req, res) {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } =
    req.body
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = await Order.create({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    })

    res.status(201).json(order)
  }
})

// PUT

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private/admin
const updateOrderToPaid = asyncHandler(async function (req, res) {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()

    const updateOrder = await order.save()
    res.json(updateOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/delivered
// @access  Private/admin
const updateOrderToDelivered = asyncHandler(async function (req, res) {
  const order = await Order.findById(req.params.id)
  if (order) {
    for (let i = 0; i < order.orderItems.length; i++) {
        const item = order.orderItems[i];
        const product = await Product.findById(item.product);
        if (product) {
          product.countInStock -= item.qty;
          await product.save();
        } else {
          res.status(404);
          throw new Error(`Product ${item.product} not found`);
        }
      }

    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updateOrder = await order.save()
    res.json(updateOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to mark payment sent
// @route   PUT /api/orders/:id/sentpayment
// @access  Private
const updateOrderSentPayment = asyncHandler(async function (req, res) {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isSentPayment = true

    const updateOrder = await order.save()
    res.json(updateOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// DELETE

// @desc    Delete order by ID
// @route   DELETE /api/orders/:id/delete
// @access  Private/admin
const deleteOrderById = asyncHandler(async function (req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404)
    throw new Error('Invalid request parameters')
  }

  const order = await Order.findById(req.params.id)

  if (order) {
    await order.remove()
    res.json({ message: 'Order deleted successfully' })
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})


export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, updateOrderSentPayment, getAllOrders, deleteOrderById, updateOrderToDelivered }

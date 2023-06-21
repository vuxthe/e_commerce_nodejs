import Product from '../models/productModel.js'
import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'

// GET

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async function (req, res) {
  const pageSize = 20
  const page = Number(req.query.pageNumber) || 1
  const category = req.query.category === 'all' ? '' : req.query.category

  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : undefined

  let query
  if (category) {
    query = { category, ...keyword}
  } else {
    query = keyword
  }

  const count = await Product.countDocuments(query)
  const products = await Product.find(query)
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Get top rated products
// @route   GET /api/products/topRated
// @access  Public

const getTopRatedProducts = asyncHandler(async function (req, res) {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5)

  res.json(products)
})

// @desc    Fetch specific product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async function (req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404)
    throw new Error('Product not found')
  }

  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// POST

// @desc    Add new product
// @route   POST /api/products/add
// @access  Private/Admin
const addProduct = asyncHandler(async function (req, res) {
  const { user, name, image, description, category, brand, price, countInStock } = req.body

  const product = await Product.create({
    user,
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
  })

  if (product) {
    res.json(product)
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

// @desc    Add new review
// @route   POST /api/products/:id/reviews
// @access  Private/Admin
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
      createdAt: Date.now(),
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// PUT

// @desc    Update product
// @route   PUT /api/products/:id/update
// @access  Private/Admin
const updateProduct = asyncHandler(async function (req, res) {
  const { name, image, description, category, brand, price, countInStock } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.image = image
    product.description = description
    product.category = category
    product.brand = brand
    product.price = price
    product.countInStock = countInStock

    product.save()
    res.json(product)
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

// DELETE

// @desc    Delete a specific product
// @route   DELETE /api/products/:id/delete
// @access  Private/Admin
const deleteProductById = asyncHandler(async function (req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404)
    throw new Error('Product not found')
  }

  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'User deleted successfully' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  deleteProductById,
  addProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
}

import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import paymentRoutes from "./routes/paymentRoutes.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config()
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __view = dirname(__filename);
// view engine setup
app.set('views', path.join(__view, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__view, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
const port = 4000

connectDB()

app.use(express.static('public'))
app.use(bodyParser.json({ inflate: true }))

app.use('/order', paymentRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/payments', paymentRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`MERN server is listening on port ${port}`)
})

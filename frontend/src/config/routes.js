import { Routes as ReactRoutes, Route } from 'react-router-dom'
import HomeScreen from '../screens/HomeScreen'
import ProductScreen from '../screens/ProductScreen'
import CartScreen from '../screens/CartScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ShippingScreen from '../screens/ShippingScreen'
import PaymentScreen from '../screens/PaymentScreen'
import PlaceOrderScreen from '../screens/PlaceOrderScreen'
import OrderDetailsScreen from '../screens/OrderDetailsScreen'
import UserListScreen from '../screens/UserListScreen'
import UserEditScreen from '../screens/UserEditScreen'
import ProductList from '../screens/ProductList'
import OrderListScreen from '../screens/OrderListScreen'
import ProductNewScreen from '../screens/ProductNewScreen'
import ProductEditScreen from '../screens/ProductEditScreen'
import  RevenueStatisticsPage  from "../screens/RevenueStatisticsPage";
function Routes() {
  return (
    <ReactRoutes>
      <Route path='/' element={<HomeScreen />} exact />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} exact />
      <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />

      <Route path='/products/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/cart/:id' element={<CartScreen />} />
      <Route path='/shipping' element={<ShippingScreen />} />
      <Route path='/payment' element={<PaymentScreen />} />
      <Route path='/placeorder' element={<PlaceOrderScreen />} />
      <Route path='/order/:id' element={<OrderDetailsScreen />} />

      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />

      <Route path='/admin/users' element={<UserListScreen />} />
      <Route path='/admin/users/:id/edit' element={<UserEditScreen />} />
      <Route path='/admin/products' element={<ProductList />} />
      <Route path='/admin/products/search/:keyword' element={<ProductList />} />
      <Route path='/admin/products/page/:pageNumber' element={<ProductList />} />
      <Route path='/admin/products/search/:keyword/page/:pageNumber' element={<ProductList />} />
      <Route path='/admin/products/:id/edit'  element={<ProductEditScreen />} />
      <Route path='/admin/products/add' element={<ProductNewScreen />} />
      <Route path='/admin/orders' element={<OrderListScreen />} />
      <Route path='/admin/revenues' element={<RevenueStatisticsPage />} />
    </ReactRoutes>
  )
}

export default Routes

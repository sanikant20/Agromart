import React from 'react';
import './App.css';
import './Responsive.css'
import "react-toastify/dist/ReactToastify.css";

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CategoryScreen from './screens/CategoryScreen';
import OrderScreen from './screens/OrderScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import AddProducts from './screens/AddProduct';
import Signup from './screens/Signup';
import Signin from './screens/Signin';

import EditProduct from './screens/productEditScreeen';
import UserScreen from './screens/UserScreen';
import PageNotFound from './screens/PageNotFound';
import AdminScreen from './screens/AdminScreen';
import EditAdminInfo from './screens/EditAdminInfo';
import EditCategory from './screens/EditCategoryScreen';
import ChangePassword from './screens/ChangePasswordScreen';
import UserDetailScreen from './screens/UserDetailScreen';


window.Buffer = window.Buffer || require("buffer").Buffer;
function App() {
  return (
    <Router>
      <Routes>

        <Route path='/login' element={<Signin />} />
        <Route path='/signup' element={< Signup />} />

        <Route path="/" element={<HomeScreen />} />
        <Route path="/products" element={<ProductScreen />} />
        <Route path="/addProduct" element={<AddProducts />} />
        <Route path="/product/:id" element={<EditProduct />} />

        <Route path="/categories" element={<CategoryScreen />} />
        <Route path="/category/:id" element={<EditCategory />} />

        <Route path="/orders" element={<OrderScreen />} />
        <Route path='/order/:id' element={<OrderDetailScreen />} />

        <Route path='/users' element={<UserScreen />} />
        <Route path='/userDetails/:id' element={< UserDetailScreen />} />

        <Route path='/adminProfile/:id' element={<AdminScreen />} />
        <Route path='/editAdminInfo/:id' element={<EditAdminInfo />} />
        <Route path='/changePassword/:id' element={<ChangePassword />} />

        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </Router>
  );
}

export default App;

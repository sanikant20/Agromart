import React from 'react';
import './App.css';
import './Responsive.css'
// import './Style.css'
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


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Signin />} exact />
        <Route path='/signup' element={< Signup />} />

        <Route path="/" element={<HomeScreen />} />
        <Route path="/products" element={<ProductScreen />} />
        <Route path="/addProduct" element={<AddProducts />} />
        <Route path="/editProduct" element={<EditProduct />} />
        <Route path="/category" element={<CategoryScreen />} />

        <Route path="/orders" element={<OrderScreen />} />
        <Route path='/order' element={<OrderDetailScreen />} />

        <Route path='/users' element={<UserScreen />} />

        <Route path='/adminProfile' element={<AdminScreen />} />
        <Route path='/editAdminInfo' element={ <EditAdminInfo />}/>

        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </Router>
  );
}

export default App;

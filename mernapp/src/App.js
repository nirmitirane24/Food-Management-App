// App.js
import './App.css';
import Home from './screens/Home.js';
import Login from './screens/Login.js';
import Signup from './screens/Signup.js';
import { CartProvider } from './components/ContextReducer'; 
import MyOrder from './screens/MyOrder.js'
import Cart from './screens/Cart.js'
import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
    <CartProvider>

    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}> </Route>
          <Route exact path="/login" element={<Login/>}> </Route>
          <Route exact path="/createuser" element={<Signup/>}> </Route>
          <Route exact path="/myOrder" element={<MyOrder/>}> </Route>
        </Routes>
      </div>
    </Router>
    
    </CartProvider>

    </>
  );
}

export default App;

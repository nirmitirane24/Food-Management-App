import React , { useState } from 'react';
import Cart from '../screens/Cart.js'
import Modal from '../components/Modal.js'
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../components/ContextReducer';
import './Navbar.css'; 



export default function Navbar() {
    let data = useCart();
    const [cartView,setCartView] = useState(false)
    const navigate = useNavigate();

    const handleLogout = ()=>{
      localStorage.removeItem("authToken");
      navigate("/createuser")

    }
  return (
    <nav className="navbar">
      <div className="container">
        <div className="left-section">
          <Link className="navbar-brand" to="/">FooD-FooD</Link>
        </div>
          <div className="navbar-links ">
            <ul className='navbar-nav '>
              <li>
                <Link to="/" className="nav-link active fs-7">Home</Link>
              </li>
              {(localStorage.getItem("authToken"))?
                <li>
                  <Link className="nav-link active fs-7" to="/myOrder"> My Orders</Link>
                </li>
              : ""}
            </ul>   
          </div>
        {(!localStorage.getItem("authToken"))?
        <div className="right-section">
          <Link to="/login" className="btn nav-link login  mx-1" style={{ color: 'black'}}>Login</Link>
          <Link to="/createuser" className="btn nav-link signup mx-6"  style={{ color: 'black'}}>Signup</Link>
        </div>
        : 
          <div>
            <div className='mycart-btn btn mx-2' onClick={()=>{setCartView(true)}} style={{ color: 'black', position: 'relative' }}>
              My Cart{" "}
              <span className="badge-pill">{data.length}</span>
            </div>
            {cartView? <Modal onClose={()=>setCartView(false)} ><Cart/> </Modal>:null}  
            <div className='logout-btn btn mx-2' style={{ color:'black'}} onClick={handleLogout}>
             Logout
            </div>
        </div>
        }
      </div>
    </nav>
  );
}

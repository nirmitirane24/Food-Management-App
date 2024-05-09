import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import './Cards.css';

export default function Cards(props) {
  const priceRef = useRef();
  const dispatch = useDispatchCart();
  const data = useCart();
  const options = props.options;
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let finalPrice = qty * parseInt(options[size]);
    
    let food = data.find(item => item.id === props.foodItem._id);
    
    if (food) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty , size:size});
      } else {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
      }
    } else {
      await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
    }
  }

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card">
        <img src={props.foodItem.img} className="card-img-top" alt="Card" style={{ height: "190px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container-card">
            <select className='dropdown-quantity' onChange={(e) => setQty(e.target.value)} >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1} </option>
                );
              })}
            </select>
            <select className="dropdown-size" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>;
              })}
            </select>
            <div className="total-price d-inline">
              Rs:{qty * parseInt(options[size])}/-
              
            </div>
            <div>
            <button className="addtocart-btn" style={{ height: "37px", color: "black", borderRadius: "5px", marginTop: "5px"}} onClick={handleAddToCart}>AddToCart</button>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.js';
import Cards from '../components/Cards.js';
import Cart from '../screens/Cart.js'
import Footer from '../components/Footer.js'
import Modal from '../components/Modal.js'
import Frontside from '../components/Frontside.js';
import './Home.css';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <Navbar />
      
      <div className="frontside-container">
        <div className="image-container">
          <img className="image" src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png" alt="Your Image" style={{objectFit: "contain !important"}}/>
          <div className="button-container">
            <form className="d-flex" >
              <input className="form-control me-5" type="search" placeholder="Search" aria-label="Search" value={search}  onChange={(e)=>{setSearch(e.target.value)}}/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="cardss-container">
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id} className="row-container">
              <div className="category_name">{category.CategoryName}</div>
              <hr />
              {foodItem.length > 0 ? (
                foodItem
                  .filter((item) => (item.CategoryName === category.CategoryName ) && (item.name.toLowerCase().includes(search.toLowerCase())))
                  .map((filterItems) => (
                    <div key={filterItems._id} className="column-container">
                        <Cards foodItem = {filterItems}
                        // foodName={filterItems.name}
                        options={filterItems.options[0]}
                        // imgSrc={filterItems.img}
                      />
                    </div>
                  ))
              ) : (
                <div>No such Data Found</div>
              )}
            </div>
          ))
        ) : (
          <div>No categories found</div>
        )}
      </div>
      <Footer />
    </div>
  );
}


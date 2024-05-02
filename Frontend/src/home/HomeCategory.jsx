import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const subTitle = "Embark on Your Shopping Adventure";
const title = "Discover Endless Possibilities with Us";
const btnText = "Let's Begin the Journey";


const HomeCategory = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from products.json
    fetch("/products.json")
        .then(response => response.json())
        .then(data => {
            // Set the items state with the 9 items, slicing only 9 items.
            setItems(data.slice(4, 13));
        })
        .catch(error => console.error('Error fetching data:', error));
}, []);

  return (
    <div className="category-section style-4 padding-tb">
      <div className='container'>
        {/* Section header here */}
        <div className='section-header text-center'>
          <span className='subtitle'>{subTitle}</span>
          <h2 className='title'>{title}</h2>
        </div>

        {/* Section for shopping cards */}
        <div className='section-wrapper'>
          <div className='row g-4 justify-content-center row-cols-md-3 row-cols-sm-2 row-cols-1'>
            {items.map((product) => (
              <div key={product.id} className='col'>
                <div className='category-item'>
                  <Link to={`/shop/${product.id}`}>
                    <div className='category-inner'>
                      {/* Image thumbnail */}
                      <div className='category-thumb'>
                        <img style={{ width: 400, height: 400 }} src={product.img} alt="React Logo" />
                      </div>
                      {/* Content */}
                      <div className='category-content'>
                        <div className='cate-icon'>
                          <i className='icofont-brand-apple' style={{ color: 'green' }}></i>
                        </div>
                        <h6>{product.name}</h6>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className='text-center mt-5'>
            <Link to="/shop" className='lab-btn'><span>{btnText}</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeCategory;


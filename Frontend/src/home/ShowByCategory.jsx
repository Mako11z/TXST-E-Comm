import React, { useEffect, useState } from 'react'
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';

const title = "Unveil the Treasures in Our Inventory";


const ShowByCategory = () => {
  const [items, setItems] = useState([]);

    // This will extract all items from inventory.
    useEffect(() => {
    // Fetch data from products.json
    fetch("/products.json")
        .then(response => response.json())
        .then(data => {
            // Extract first all items for each category
            const filteredItems = [];
            const categories = ["Electronics", "Casual", "Gym", "Gifts"];
            categories.forEach(category => {
                const categoryItems = data.filter(item => item.categoryType === category);
                filteredItems.push(...categoryItems);
            });
            setItems(filteredItems);
        })
        .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  // Filtering based on category.
  const filterItem = (categItem) => {
    // Fetch data from products.json again
    fetch("/products.json")
      .then(response => response.json())
      .then(data => {
        // If categItem is undefined, set items to the original list
        if (!categItem) {
          setItems(data);
        } else {
          // Filter data based on category
          const filteredItems = data.filter(item => item.categoryType === categItem);
          setItems(filteredItems);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  };
  
  return (
    <div className='course-section style-3 padding-tb'>
      {/* Our shapes */}
      <div className='course-shape one'><img src="/images/icon/01.png" alt="" /></div>
      <div className="course-shape two"><img src="/images/icon/02.png" alt="" /></div>
  
      {/* Main section */}
      <div className='container'>
  
        {/* Section header */}
        <div className='section-header'>
          <h2 className='title'>{title}</h2>
          <div className='course-filter-group'>
            <ul className='lab-ul'>
              <li onClick={() => filterItem()}>All</li>
              <li onClick={() => filterItem("Electronics")}>Electronics</li>
              <li onClick={() => filterItem("Casual")}>Casual</li>
              <li onClick={() => filterItem("Gym")}>Gym</li>
              <li onClick={() => filterItem("Gifts")}>Gifts</li>
            </ul>
          </div>
        </div>
  
        {/** Section body */}
        <div className='section-wrapper'>
          <div className='row g-4 justify-content-center course-filter'>
            {
              items.map((product) => (
                <div key={product.id} className="col-lg-3 col-md-6">
                  <div className='course-item style-4'>
                    <div className='course-inner'>
                      <div className='course-thumb'>
                        {/* Setting size of all our images and make it clickable */}
                        <Link to={`/shop/${product.id}`}>
                          <img style={{ width: 400, height: 350 }} src={product.img} alt="Product-thumb" />
                        </Link>
                        <div className='course-category'>
                          <div className='course-cate'>
                            <Link to="/">{product.categoryType}</Link>
                          </div>
  
                          <div className='course-review'>
                            <Rating />
                          </div>
                        </div>
                      </div>
  
                      {/** Click on item title will take you to shop single item*/}
                      <div className='course-content'>
                        <Link to={`/shop/${product.id}`}><h6>{product.name}</h6></Link>
                        <div className='course-footer'>
                          <div className='course-author'>
                            <Link to="/" className='ca-name'>{product.seller}</Link>
                          </div>
                          <div className='course-price'>
                            {product.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default ShowByCategory;
import React, { useState } from 'react';
import productData from "../products.json";
import { Link } from 'react-router-dom';

//Banner is a search component, this will help user to search for any item..

const title = (
    <h2>Search your <span>products</span> here!</h2>
)



const desc = "We have a lot of school supplies for you!";

const bannerList = [
    {
    iconName: "icofont-users-alt-4",
    text: "1.5 Million Customers",
    },
    {
    iconName: "icofont-notification",
    text: "More then 2000 Marchent",
    },
    {
    iconName: "icofont-globe",
    text: "Buy Anything Online",
    },
];
    

const Banner = () => {
    const [searchInput, setSearchInput] = useState("");
    const [filteredproducts, setFilteredProducts] = useState(productData);
    //console.log(productData);

    //search functionality
    const handleSearch = e => {
        //console.log(e.target.value)
        const searchTerm = e.target.value;
        setSearchInput(searchTerm);

        //filter product based on search
        const filtered = productData.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

        setFilteredProducts(filtered);
        }

  return (
    <div className='banner-section style-4' style={{backgroundImage:"url('/images/customphotos/background10.jpeg')"}}>
        <div className='container'>
            <div className='banner-content'>
                {title}
                <form style={{ backgroundColor: 'white' }}>
                    {/* <SelectedCategory select={"all"}/> */}
                    <input type="text" name="search" placeholder='Search your item' value= {searchInput} onChange={handleSearch}/>
                    <button type="submit">
                    <i className="icofont-search"></i>
                    </button>
                </form>
                <p style={{ color: 'black' }}>{desc}</p>

                <ul className='lab-ul'>
                    {
                        searchInput && filteredproducts.map((product, i) => <li key={i}>
                            <Link to={`/shop/${product.id}`}>{product.name}</Link>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Banner

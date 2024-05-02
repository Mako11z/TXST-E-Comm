// import React from 'react'
// import { useState } from 'react';
// import PageHeader from '../components/PageHeader';
// import Data from "../products.json";
// import Pagination from './Pagination';
// import ProductCards from './ProductCards';
// import Search from './Search';
// import ShopCategory from './ShopCategory';

// const showPageResults = "Showing 01 - 12 of 139 results";

// const Shop = () => {
//     const [GridList, setGridList] = useState(true);
//     const [products, setProducts] = useState(Data);

//     // pagination
//     const [currentPage, setCurrentPage] = useState(1);
//     const productsPerPage = 12;
//     const indexOfLastProduct = currentPage * productsPerPage;
//     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//     const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    
//     // Change to current page
//     const paginate = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     }
//     // Filter products based on category
//     const [selectedCategory, setSelectedCategory] = useState("All");
//     const menuItems = [...new Set(Data.map((Val) => Val.category))];
//     const filterItems = (curcat) => {
//         const newItem = Data.filter((newVal) => {
//             return newVal.category === curcat;
//         });
//         setSelectedCategory(curcat);
//         setProducts(newItem);
//     }
    
//   return (
//     <div>
//         <PageHeader title="Begin shopping now!" curPage="Shop"/>
//         <div className='shop-page padding-tb'>
//             <div className="container">
//                 <div className="row justify-content-center">
//                     <div className='col-lg-8 col-12'>
//                         <article>
//                             {/* layout and title */}
//                             <div className='shop-title d-flex flex-warp justify-content-between'>
//                                 <p>{showPageResults}</p>
//                                 <div className={`product-view-mode ${GridList ? "gridActive" : "listActive"}`}>
//                                     <a className='grid' onClick={() => setGridList(!GridList)}>
//                                         <i className='icofont-ghost'></i>
//                                     </a>
//                                     <a className='list' onClick={() => setGridList(!GridList)}>
//                                         <i className='icofont-listine-dots'></i>
//                                     </a>
//                                 </div>
//                             </div>
//                             {/*  product cards */}
//                             <div>
//                                 <ProductCards GridList={GridList} products={currentProducts}/>
//                             </div>

//                             <Pagination 
//                                 productsPerPage={productsPerPage}
//                                 totalProducts={products.length}
//                                 paginate={paginate}
//                                 activePage={currentPage}
//                             />
//                         </article>
//                     </div>
//                     <div className='col-lg-4 col-12'>
//                         <aside>
//                             <Search products={products} GridList={GridList}/>
//                             <ShopCategory 
//                             filterItems={filterItems}
//                             setItem={setProducts}
//                             menuItems={menuItems}
//                             setProducts={setProducts}
//                             selectedCategory={selectedCategory}
//                             />
//                         </aside>
//                     </div>
//                 </div>
//             </div>
//         </div> 
//     </div>
//   );
// }
// export default Shop;

import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import Pagination from './Pagination';
import ProductCards from './ProductCards';
import Search from './Search';
import ShopCategory from './ShopCategory';

const showPageResults = "Showing 01 - 12 of 139 results";

const Shop = () => {
    const [GridList, setGridList] = useState(true);
    const [products, setProducts] = useState([]);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    
    // Change to current page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // Fetch products data from JSON file
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("/products.json");
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Filter products based on category
    const [selectedCategory, setSelectedCategory] = useState("All");
    const menuItems = [...new Set(products.map((Val) => Val.category))];
    const filterItems = (curcat) => {
        const newItem = products.filter((newVal) => {
            return newVal.category === curcat;
        });
        setSelectedCategory(curcat);
        setProducts(newItem);
    }
    
    return (
        <div>
            <PageHeader title="Begin shopping now!" curPage="Shop"/>
            <div className='shop-page padding-tb'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className='col-lg-8 col-12'>
                            <article>
                                {/* layout and title */}
                                <div className='shop-title d-flex flex-warp justify-content-between'>
                                    <p>{showPageResults}</p>
                                    <div className={`product-view-mode ${GridList ? "gridActive" : "listActive"}`}>
                                        <button className='grid' onClick={() => setGridList(!GridList)}>
                                            <i className='icofont-ghost'></i>
                                        </button>
                                        <button className='list' onClick={() => setGridList(!GridList)}>
                                            <i className='icofont-listine-dots'></i>
                                        </button>
                                    </div>
                                </div>
                                {/*  product cards */}
                                <div>
                                    <ProductCards GridList={GridList} products={currentProducts}/>
                                </div>

                                <Pagination 
                                    productsPerPage={productsPerPage}
                                    totalProducts={products.length}
                                    paginate={paginate}
                                    activePage={currentPage}
                                />
                            </article>
                        </div>
                        <div className='col-lg-4 col-12'>
                            <aside>
                                <Search products={products} GridList={GridList}/>
                                <ShopCategory 
                                    filterItems={filterItems}
                                    setItem={setProducts}
                                    menuItems={menuItems}
                                    setProducts={setProducts}
                                    selectedCategory={selectedCategory}
                                />
                            </aside>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
}
export default Shop;

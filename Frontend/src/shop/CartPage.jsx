import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import delImgUrl from '../assets/images/shop/del.png';
import PaymentForm from './PaymentForm';
import StripeContainer from './StripeContainer';

const CartPage = () => {
    const [cartItem, setCartItem] = useState([]);
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItem(storedCartItems);
    }, []);

    // Calulate price.
    const calPrice = (item) => {
        return item.price * item.quantity;
    }

    // Handle quantity increase
    const handleInc = (item) => {
        item.quantity += 1;
        setCartItem([...cartItem]);
        // update local storage
        localStorage.setItem("cart", JSON.stringify(cartItem));
    }

    // Handle quantity decrease
    const handleDec = (item) => {
        if (item.quantity > 1) {
            item.quantity -= 1;
            setCartItem([...cartItem]);
            // update local storage
            localStorage.setItem("cart", JSON.stringify(cartItem));
        }
    }

    // handle item remove
    const handleRem = (item) => {
        const update = cartItem.filter((cartItem) => cartItem.id !== item.id);
        setCartItem(update);
        updateLocalStorage(update);
    }
    const updateLocalStorage = (cart) => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    // cart subtotal
    const cartSubTotal = cartItem.reduce((total, item) => {
        return total + calPrice(item);
    }, 0)
    // Order total
    const orderTotal = cartSubTotal;

    //Added this handleQuantityChange, since I added the onchange in the input
    const handleQuantityChange = (e, item) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            item.quantity = newQuantity;
            setCartItem([...cartItem]);
            // Update local storage
            updateLocalStorage(cartItem);
        }
    };
    

  return (
    <div>
        <PageHeader title={'Time to finalize your order!'} curPage={'Cart Page'}/>
        <div className='shop-cart padding-tb'>
            <div className='container'>
                <div className='section-wrapper'>
                    <div className='cart-top'>
                        <table>
                            <thead>
                                <tr>
                                    <th className='cat-product'>Product</th>
                                    <th className='cat-price'>Price</th>
                                    <th className='cat-quantity'>Quantity</th>
                                    <th className='cat-toprice'>Total</th>
                                    <th className='cat-edit'>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItem.map((item, index) => (
                                    <tr key={index}>
                                        <td className='product-item cat-product'>
                                            <div className='p-thumb'>
                                                <Link to="/shop"><img src={item.img} alt=""/></Link>
                                            </div>
                                            <div className='p-content'>
                                                <Link to="/shop">{item.name}</Link>
                                            </div>
                                        </td>
                                        <td className='cat-price'>${item.price}</td>
                                        <td className='cat-quantity'>
                                            <div className='cart-plus-minus'>
                                                <div className='dec qtybutton' onClick={() => handleDec(item)}>-</div>
                                                    {/** adding onChange handler to avoid renderring the field as read-only */}
                                                    <input 
                                                        type='text' className='cart-plus-minus-box' name='qtybutton'
                                                        value={item.quantity} 
                                                        onChange={(e) => handleQuantityChange(e, item)}
                                                    />
                                                <div className='inc qtybutton' onClick={() => handleInc(item)}>+</div>
                                            </div>
                                        </td>
                                        <td className='cat-toprice'>${calPrice(item)}</td>
                                        <td className='cat-edit'>
                                            <a href='#' onClick={() => handleRem(item)}>
                                                <img src={delImgUrl} />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='cart-bottom'>
                        <div className='cart-checkout-box'>
                            <form className='cart-checkout'>
                                <input type='submit' value='Update Cart'/>
                                <div>
                                    <StripeContainer orderTotal={orderTotal}/>
                                </div>
                            </form>
                        </div>
                        <div className='shiping-box'>
                            <div className='row'>
                                <div className='col-md-6 col-12'>
                                    <div className='calculate-shiping'>
                                        <h3>Calculate Shipping</h3>
                                        <div className='outline-select'>
                                            <input type='text' name='Country' id='Country' placeholder='Country'/>
                                        </div>
                                        <div className='outline-select shipping-select'>
                                            <input type='text' name='City' id='City' placeholder='City' />
                                        </div>
                                        <input type='text' name='postalCode' id='postalCode' className='cart-page-input-text' placeholder='zipcode'/>
                                    </div>
                                </div>

                                <div className='col-md-6 col-12'>
                                    <div className='cart-overview'>
                                        <h3>Cart Totals</h3>
                                        <ul className='lab-ul'>
                                            <li>
                                                <span className='pull-left'>Cart Subtotal</span>
                                                <p className='pull-right'>${cartSubTotal}</p>
                                            </li>
                                            <li>
                                                <span className='pull-left'>Shiiping and handling</span>
                                                <p className='pull-right'>Free shipping</p>
                                            </li>
                                            <li>
                                                <span className='pull-left'>Order Total</span>
                                                <p className='pull-right'>${orderTotal.toFixed(2)}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartPage
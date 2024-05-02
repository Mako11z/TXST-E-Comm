import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from 'react-router-dom';
import PaymentForm from "./PaymentForm";
const PUBLIC_KEY = "pk_test_51OpLkZDmD8cc09HPCpa8fgjzQjwUDqQSI3UwmPauy1yhwJHDWgGtmg0TtXpqRZFohP0UlFy3pG3ubGEM88aN9Gz100EWryzPby";
const stripeTestPromise = loadStripe(PUBLIC_KEY);


const StripeContainer = ({orderTotal}) => {
    console.log("Stripe:", orderTotal);
    return (
        <div className="">
            <Link to={`/pay/${orderTotal}`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#FF5733', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Proceed to Checkout</button>
            </Link> 
        </div>
    );
};

export default StripeContainer;

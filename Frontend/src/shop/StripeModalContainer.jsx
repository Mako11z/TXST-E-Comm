import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from 'react-router-dom';

const PUBLIC_KEY = "pk_test_51OpLkZDmD8cc09HPCpa8fgjzQjwUDqQSI3UwmPauy1yhwJHDWgGtmg0TtXpqRZFohP0UlFy3pG3ubGEM88aN9Gz100EWryzPby";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeModalContainer = () => {
    const { orderTotal } = useParams();
    console.log("StripeModalContainer:", orderTotal);
    return (
        <div>
            <br />
            <br />
            <br />
            <Elements stripe={stripeTestPromise}>
                <PaymentForm orderTotal={orderTotal}/>
            </Elements>   
                          
        </div>
    );
}

export default StripeModalContainer;

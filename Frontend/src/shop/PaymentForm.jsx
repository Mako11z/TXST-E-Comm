import React, { useState, useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const PaymentForm = ({orderTotal}) => {
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    console.log("Hey man its working.",orderTotal)


    // Direct to home page
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const {user} = useAuth();

    const handleOrderConfirm = async () => {
        alert('Your order is placed successfully');
        // Retrieve cart items from local storage
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (!user) {                                                //PULLING USER LOGGED IN DURRING PURCHASE
        console.error('No user logged in');
        return; // Exit if no user is logged in
    }

    const userName = user.displayName;      //setting user

        const itemsToSend = cartItems.map(item => ({
            id: item.id,
            name: item.name,  // Assuming you store the product name under 'product'
            price: item.price,
            quantity: item.quantity,
            total: item.quantity * item.price  // Calculate total per item if necessary
        }));

        try {
            // Send cart data to your backend
            const response = await fetch('https://commerce-app-adminserver.onrender.com/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ items: itemsToSend, userName: userName }) //uesrname and items in payload
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Transaction saved', data);
                localStorage.removeItem("cart");
                navigate(from, {replace: true});
            } else {
                throw new Error(data.message || "Could not complete transaction");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async (e) => {
        console.log("Passing to payment now.", orderTotal);
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });
   
        if (!error) {
            try {
                const {id} = paymentMethod
                const response = await axios.post("https://commerce-app-stripeserver.onrender.com/payment",{
                    amount: orderTotal * 100,
                    id,
                    return_url: window.location.href
                })
                console.log("Successfully");
                if (response.data.success) {
                    console.log("Successful payment");
                    setSuccess(true);
                    handleOrderConfirm();
                }
            } catch (error) {
                console.log("Error", error);
            }
        } else {
            console.log(error.message);
        }
    };

    return (
        <>
        {!success ?
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '50px auto 0' }}>
                <h3>Card Information</h3>
                <fieldset style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <CardElement style={{ base: { fontSize: '16px' } }} />
                    </div>
                </fieldset>
                <h3>Billing Details</h3>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
                <input type="text" placeholder="Location" value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
                <input type="text" placeholder="Zip Code" value={zipcode} onChange={(e) => setZipcode(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '20px' }} />
                <button type="submit" style={{ display: 'block', width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Order Now</button>
            </form>
            :
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Payment Successful</h2>
            </div>
        }
        </>
    );
};

export default PaymentForm;

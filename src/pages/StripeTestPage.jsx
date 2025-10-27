// src/pages/StripeTestPage.jsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51S9DkiKAY8PM72prQaMsHqI8XCqSHJ2q5u639tBw8C9HUsRUjClAdCakpx4T5zBvsW2lkHddGz9jPsmjLdt4n9Uy003KA5MnRR');

function StripeTestPage() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      lineItems: [{ price: 'price_...', quantity: 1 }],
      mode: 'payment',
      successUrl: window.location.origin + '/success',
      cancelUrl: window.location.origin + '/cancel',
    });
    if (result.error) alert(result.error.message);
  };

  return <button onClick={handleCheckout}>Test Stripe</button>;
}

export default StripeTestPage;
import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const key =
  "pk_test_51MVwHKAVnEy4yTpAUiNezU2anB9TXj3MEYnvX00wditllrrsqQB2OafFBIc9ndlLqQZt686LB5H2qYrcMKxHVNHf00AVO1dPf7";

const Checkout = () => {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/checkout/payment`,
          { tokenId: stripeToken.id, amount: 2000 }
        );

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <StripeCheckout
      name="Faruk Shop"
      img={"/images/logo.png"}
      billingAddress
      shippingAddress
      amount={2000}
      token={onToken}
      stripeKey={key}
    ></StripeCheckout>
  );
};

export default Checkout;

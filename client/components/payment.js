import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

export default class Payment extends React.Component {
  onToken = token => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  };

  // ...

  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_993i9hwgtSpI3FO7gmDdjSTp00sOxkoZvd"
      />
    );
  }
}

const mapDispatch = dispatch => {
  return {
    increaseQuantity: id => dispatch(increaseQuantity(id)),
    decreaseQuantity: id => dispatch(decreaseQuantity(id)),
  };
};

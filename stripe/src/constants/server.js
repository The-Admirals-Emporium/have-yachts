const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://have-yachts.herokuapp.com'
    : 'http://localhost:8080';

export default PAYMENT_SERVER_URL;

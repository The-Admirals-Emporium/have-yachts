/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar';
export { default as UserHome } from './user-home';
export { default as BoatList } from './boatList';
export { default as SingleBoat } from './singleBoat';
export { default as GuestHome } from './guest-home';
export { default as Cart } from './cart';
export { default as AllUsersAdminView } from './allUsersAdminView';
export { default as Admin } from './admin';
export { default as Payment } from './payment';
export { default as UserProfile } from './userProfile';
export { default as LoginAndSecurity } from './loginAndSecurity';
export { default as UserOrders } from './userOrders';
export { default as Checkout } from './checkout';
export { default as AddressForm } from './addressForm';
export { default as PaymentForm } from './paymentForm';
export { default as ReviewForm } from './review';
export { default as CheckoutNavbar } from './checkoutNavbar';
export { default as AdminAllUsers } from './adminAllUsers';
export { default as AdminAllProducts } from './adminAllProducts';
export { default as AdminAllOrders } from './adminAllOrders';

export { Login, Signup } from './auth-form';

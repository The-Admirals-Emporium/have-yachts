import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import users from './users';
import boat from './boat';
import order, { userOrder } from './userOrder';
import orders, { userOrders } from './orders';

const reducer = combineReducers({
  user,
  users,
  boat,
  order,
  orders,
  userOrder,
  userOrders,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './boat';
export * from './userOrder';
export * from './users';
export * from './orders';

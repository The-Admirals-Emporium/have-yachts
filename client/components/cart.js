import Payment from './payment';
import React from 'react';
import { connect } from 'react-redux';
import { costDisplay } from './utils';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// cart should be a stateless, functional component like grocery item in add groceries
const Cart = props => {
  // const localStorageCart = JSON.parse(window.localStorage.getItem('cart'));
  // TKTK sync these?

  let cart = props.isLoggedIn ? props.userCart : props.cart;

  if (!props.isLoggedIn) {
    // calculate guest cart total
    const updatedTotal = cart.boats.reduce(
      (currTotal, boat) => currTotal + boat.cost * boat.order_boats.quantity,
      0.0
    );
    cart.total = updatedTotal;
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  if (cart) {
    return (
      <div id="cartHero">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <h3>Status: {cart.status}</h3>
              <h3>Total: {costDisplay(cart.total)}</h3>
              <TableRow>
                <TableCell align="right">Boat</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cart.boats.map(boat => {
                return (
                  <TableRow key={boat.id}>
                    <TableCell align="right">{boat.name}</TableCell>
                    <TableCell align="right">
                      {costDisplay(boat.cost)}{' '}
                    </TableCell>
                    <TableCell align="right">
                      Quantity:{' '}
                      <select onChange={e => props.changeQuantity(e, boat.id)}>
                        {[...Array(boat.order_boats.quantity).keys()].map(
                          ind => (
                            <option
                              key={ind}
                              value={boat.order_boats.quantity - ind}
                            >
                              {boat.order_boats.quantity - ind}
                            </option>
                          )
                        )}
                      </select>
                    </TableCell>
                    <TableCell align="right">
                      <button
                        type="button"
                        size="small"
                        color="primary"
                        onClick={() => props.remove(boat)}
                      >
                        Remove
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <h3>
          Buy now: <Payment />
        </h3>

        <Link to="/checkout">
          <h3>Proceed to checkout</h3>
        </Link>
      </div>
    );
  } else {
    return 'no cart';
  }
};

export default Cart;

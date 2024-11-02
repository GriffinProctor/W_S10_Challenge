import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../state/store';

export default function OrderList() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.list);
  const filter = useSelector((state) => state.filter);

  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.size === filter);

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.map((order, index) => (
          <li key={index}>
            <div>
              {`${order.fullName} ordered a size ${order.size} with ${order.toppings.length} topping${order.toppings.length === 1 ? '' : 's'}`}
            </div>
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map(size => (
          <button
            data-testid={`filterBtn${size}`}
            key={size}
            className={`button-filter${size === filter ? ' active' : ''}`}
            onClick={() => dispatch(setFilter(size))}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
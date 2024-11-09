import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormValue, setPending, setError, resetForm, addOrder } from '../state/store';

export default function PizzaForm() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(setFormValue({ name, value: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setPending(true));

    const newOrder = {
      fullName: form.fullName,
      size: form.size,
      toppings: Object.keys(form.toppings).filter((key) => form.toppings[key]),
    };

    setTimeout(() => {
      if (newOrder.fullName.length < 3) {
        dispatch(setError('Full name must be at least 3 characters'));
      } else {
        dispatch(addOrder(newOrder));
        dispatch(resetForm());
      }
      dispatch(setPending(false));
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {form.isPending && <div className="pending">Order in progress...</div>}
      {form.error && <div className="failure">Order failed: {form.error}</div>}

      <div className="input-group">
        <label htmlFor="fullName">Full Name</label><br />
        <input
          data-testid="fullNameInput"
          id="fullName"
          name="fullName"
          placeholder="Type full name"
          type="text"
          value={form.fullName}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="size">Size</label><br />
        <select
          data-testid="sizeSelect"
          id="size"
          name="size"
          value={form.size}
          onChange={handleChange}
        >
          <option value="">----Choose size----</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
      </div>

      <div className="input-group">
        {['1', '2', '3', '4', '5'].map((topping) => (
          <label key={topping}>
            <input
              type="checkbox"
              data-testid={`check${topping}`}
              name={topping}
              checked={form.toppings[topping]}
              onChange={handleChange}
            />
            {['Pepperoni', 'Green Peppers', 'Pineapple', 'Mushrooms', 'Ham'][topping - 1]}<br />
          </label>
        ))}
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
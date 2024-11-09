import { configureStore, createSlice } from '@reduxjs/toolkit';


const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    list: [
      {
        id: 1,
        fullName: 'Sigourney Weaver',
        size: 'S',
        toppings: ['Pepperoni', 'Mushrooms'], 
      },
    ],
  },
  reducers: {
    setOrders: (state, action) => { state.list = action.payload; },
    addOrder: (state, action) => { state.list.push(action.payload); },
  },
});


const filterSlice = createSlice({
  name: 'filter',
  initialState: 'All',
  reducers: {
    setFilter: (state, action) => action.payload,
  },
});


const formSlice = createSlice({
  name: 'form',
  initialState: {
    fullName: '',
    size: '',
    toppings: { '1': false, '2': false, '3': false, '4': false, '5': false },
    isPending: false,
    error: null,
  },
  reducers: {
    setFormValue: (state, action) => {
      const { name, value } = action.payload;
      if (name in state.toppings) {
        state.toppings[name] = value;
      } else {
        state[name] = value;
      }
    },
    setPending: (state, action) => { state.isPending = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
    resetForm: (state) => {
      state.fullName = '';
      state.size = '';
      state.toppings = { '1': false, '2': false, '3': false, '4': false, '5': false };
      state.isPending = false;
      state.error = null;
    },
  },
});


export const {
  setOrders,
  addOrder,
} = orderSlice.actions;
export const { setFilter } = filterSlice.actions;
export const {
  setFormValue,
  setPending,
  setError,
  resetForm,
} = formSlice.actions;


export const resetStore = () => configureStore({
  reducer: {
    orders: orderSlice.reducer,
    filter: filterSlice.reducer,
    form: formSlice.reducer,
  },
});


export const store = resetStore();
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  errMessage: null,
};

export const getCart = createAsyncThunk("cart/getCart", async (thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/cart/getcart`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      let product = action.payload;

      console.log("prod", product);

      console.log(JSON.stringify(state.cart));

      let productInCart = state.cart.findIndex(
        (prod) =>
          prod.productId === product.productId && prod.size === product.size
      );
      state.errMessage = null;
      console.log("prodIncart", productInCart);

      if (productInCart === -1) {
        state.cart.push(product);
      } else {
        state.cart[productInCart].quantity += product.quantity;
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    increaseQuantity(state, action) {
      let prodId = action.payload;
      let prodIndex = state.cart.findIndex((product) => product.id === prodId);

      state.cart[prodIndex].quantity += 1;

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    decreaseQuantity(state, action) {
      let prodId = action.payload;
      let prodIndex = state.cart.findIndex((product) => product.id === prodId);
      let prodQuantity = state.cart[prodIndex].quantity;

      if (prodQuantity > 1) {
        state.cart[prodIndex].quantity -= 1;

        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    removeFromCart(state, action) {
      let prodId = action.payload;
      let filteredCart = state.cart.filter((product) => product.id !== prodId);

      state.cart = filteredCart;

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    clearCart(state) {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;

export const selectMessage = (state) => state.cart.errMessage;

export const selectTotal = (state) => state.cart.subTotal;

export default cartSlice.reducer;

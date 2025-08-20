import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  total: 0,
  subtotal: 0,

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      // Normalize cart payload to an array in case API returns { cart: [...] } or plain array
      const payload = Array.isArray(res.data) ? res.data : res.data?.cart ?? [];
      set({ cart: payload });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      const message = error.response?.data?.message || error.message || "An error occurred";
      toast.error(message);
    }
  },

  clearCart: async () => {
    set({ cart: [], total: 0, subtotal: 0 });
  },

  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart");

      set((prevState) => {
        const existingItem = prevState.cart.find((item) => item._id === product._id);
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      const message = error.response?.data?.message || error.message || "An error occurred";
      toast.error(message);
    }
  },

  removeFromCart: async (productId) => {
    try {
      await axios.delete(`/cart`, { data: { productId } });
      set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
      get().calculateTotals();
      toast.success("Item removed from cart");
    } catch (error) {
      const message = error.response?.data?.message || error.message || "An error occurred";
      toast.error(message);
    }
  },

  updateQuantity: async (productId, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(productId);
      return;
    }

    try {
      await axios.put(`/cart/${productId}`, { quantity });
      set((prevState) => ({
        cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
      }));
      get().calculateTotals();
    } catch (error) {
      const message = error.response?.data?.message || error.message || "An error occurred";
      toast.error(message);
    }
  },

  calculateTotals: () => {
    const { cart } = get();
    const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
    const total = subtotal;
    set({ subtotal, total });
  },
}));

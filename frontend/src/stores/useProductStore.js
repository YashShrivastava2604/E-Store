import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);
      const newProduct = res.data?.product ?? res.data;
      set((prevState) => ({
        products: [...prevState.products, newProduct],
        loading: false,
      }));
      toast.success("Product created");
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Failed to create product";
      toast.error(message);
      set({ loading: false });
    }
  },

  fetchAdminProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products");
      const payload = Array.isArray(response.data)
        ? response.data
        : response.data.products ?? [];
      set({ products: payload, loading: false, error: null });
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Failed to fetch products";
      set({ error: message, loading: false });
      toast.error(message);
    }
  },

  fetchSellerProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products/my-products");
      const payload = response.data.products ?? [];
      set({ products: payload, loading: false, error: null });
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Failed to fetch your products";
      set({ error: message, loading: false });
      toast.error(message);
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/products/category/${category}`);
      const payload = Array.isArray(response.data)
        ? response.data
        : response.data.products ?? [];
      set({ products: payload, loading: false, error: null });
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Failed to fetch products";
      set({ error: message, loading: false });
      toast.error(message);
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products/featured");
      const payload = Array.isArray(response.data)
        ? response.data
        : response.data.products ?? [];
      set({ products: payload, loading: false, error: null });
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Failed to fetch featured products";
      set({ products: [], error: message, loading: false });
      toast.error(message);
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((prevState) => ({
        products: prevState.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));
      toast.success("Product deleted");
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Failed to delete product";
      set({ loading: false });
      toast.error(message);
    }
  },

  // toggleFeaturedProduct: async (productId) => {
  //   set({ loading: true });
  //   try {
  //     const response = await axios.put(`/products/${productId}`);
  //     const updated =
  //       response.data?.updatedProduct ?? response.data?.product ?? response.data;
  //     set((prevState) => ({
  //       products: prevState.products.map((product) =>
  //         product._id === productId ? { ...product, ...updated } : product
  //       ),
  //       loading: false,
  //     }));
  //     toast.success("Product updated");
  //   } catch (error) {
  //     const message =
  //       error.response?.data?.error || error.message || "Failed to update product";
  //     set({ loading: false });
  //     toast.error(message);
  //   }
  // },
  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/products/${productId}`);
      const updated = response.data;

      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id === productId ? { ...product, ...updated } : product
        ),
        loading: false,
      }));

      toast.success("Product updated");
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Failed to update product";
      set({ loading: false });
      toast.error(message);
    }
  },

}));

import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
	user: null,
	users: [],
	loading: false,
	checkingAuth: true,
	navigate: null,

	setNavigate: (navigate) => set({ navigate }),

	fetchAllUsers: async () => {
        set({ loading: true });
        try {
            const res = await axios.get("/auth/users");
            set({ users: res.data.users });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch users");
        } finally {
			set({ loading: false });
		}
    },

    updateUserRole: async (userId, role) => {
        try {
            const res = await axios.patch(`/auth/users/${userId}/role`, { role });
            set((state) => ({
                users: state.users.map((u) => (u._id === userId ? res.data.user : u)),
                user: state.user && state.user._id === userId ? res.data.user : state.user,
            }));
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update role");
        }
    },

	signup: async ({ name, email, password }) => {
		set({ loading: true });
		const navigate = get().navigate;

		try {
			const res = await axios.post("/auth/signup", { name, email, password });
			localStorage.setItem("pendingEmail", email);
			toast.success(res.data.message);
			if (navigate) navigate("/verify-email");
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred during sign up");
		} finally {
			set({ loading: false });
		}
	},

	verifyOtp: async (otp) => {
		set({ loading: true });
		const navigate = get().navigate;
		try {
			const email = localStorage.getItem("pendingEmail");
			if (!email) {
				toast.error("No pending email found. Please sign up again.");
				if (navigate) navigate("/signup");
				return;
			}
			
			const res = await axios.post("/auth/verify-otp", { email, otp });
			localStorage.removeItem("pendingEmail");
			set({ user: res.data.user });
			toast.success(res.data.message);
			if (navigate) navigate("/");
		} catch (error) {
			toast.error(error.response?.data?.message || "Invalid OTP");
		} finally {
			set({ loading: false });
		}
	},
	login : async (email, password) => {
		set({ loading: true });
		const navigate = get().navigate;
		try {
			const res = await axios.post("/auth/login", { email, password });
			set({ user: res.data });
			toast.success("Logged in successfully!");
			if (navigate) navigate("/");
		} catch (error) {
			const message = error.response?.data?.message || "Login failed. Please try again.";
			toast.error(message);
			
			if (error.response?.status === 403) {
				localStorage.setItem("pendingEmail", email);
				if (navigate) navigate("/verify-email");
			}
		} finally {
			set({ loading: false });
		}
	},

	logout: async () => {
		set({ loading: true });
		const navigate = get().navigate;
		try {
			await axios.post("/auth/logout");
			set({ user: null });
			localStorage.removeItem("pendingEmail");
			toast.success("Logged out successfully.");
			if (navigate) navigate("/login");
		} catch (error) {
			toast.error(error.response?.data?.message || "Logout failed.");
		} finally {
			set({ loading: false });
		}
	},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axios.get("/auth/profile");
			set({ user: response.data });
		} catch (error) {
			set({ user: null });
		} finally {
			set({ checkingAuth: false });
		}
	},

	refreshToken: async () => {
		if (get().checkingAuth) return;
		set({ checkingAuth: true });
		try {
			await axios.post("/auth/refresh-token");
		} catch (error) {
			set({ user: null });
			throw error;
		} finally {
			set({ checkingAuth: false });
		}
	},

    requestSellerAccess: async () => {
        set({ loading: true });
        try {
            const res = await axios.post("/auth/request-seller-access");
            set((state) => ({
                user: { ...state.user, ...res.data.user },
            }));
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send request");
        } finally {
			set({ loading: false });
		}
    },
}));


// Axios interceptor for token refresh
let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			if (originalRequest.url.includes('/auth/login') || originalRequest.url.includes('/auth/refresh-token')) {
				useUserStore.getState().logout();
				return Promise.reject(error);
			}

			try {
				if (!refreshPromise) {
					refreshPromise = useUserStore.getState().refreshToken();
				}
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);
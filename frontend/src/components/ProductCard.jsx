import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();

	const imageUrl =
		typeof product.image === "string"
			? product.image
			: Array.isArray(product.image)
			? product.image[0]
			: product.image?.url || "/placeholder.png";

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			addToCart(product);
			toast.success(`${product.name} added to cart!`);
		}
	};

	return (
		<motion.div 
			className="w-full h-full bg-white flex flex-col rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
			whileHover={{ y: -5 }}
		>
			<div className="relative h-64 overflow-hidden rounded-t-2xl group">
				<img className="object-cover w-full h-full" src={imageUrl} alt={product.name || "Product image"}/>
			</div>
			<div className="p-5 flex-grow flex flex-col justify-between">
				<div>
					<h5 className="text-xl font-bold tracking-tight text-gray-900">{product.name}</h5>
					<p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
				</div>
				<div className="mt-4 flex items-center justify-between">
					<p className="text-2xl font-bold text-emerald-600">${product.price}</p>
					<button
						className="flex items-center justify-center rounded-lg bg-emerald-600 p-2.5 text-center text-sm font-medium
						text-white hover:bg-emerald-700 transition-colors"
						onClick={handleAddToCart}
						aria-label="Add to cart"
					>
						<ShoppingCart size={22} />
					</button>
				</div>
			</div>
		</motion.div>
	);
};

export default ProductCard;
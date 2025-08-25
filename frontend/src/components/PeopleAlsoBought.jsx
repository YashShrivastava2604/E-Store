import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
	const [recommendations, setRecommendations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				const res = await axios.get("/products/recommendations");
				setRecommendations(res.data);
			} catch (error) {
				console.error("Could not fetch recommendations:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchRecommendations();
	}, []);


	if (recommendations.length === 0) return null;

	return (
		<div className='mt-16'>
			<h3 className='text-3xl font-bold text-gray-800 mb-8'>People also bought</h3>
			{isLoading ? <LoadingSpinner /> : (
				<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
					{recommendations.slice(0, 3).map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>
			)}
		</div>
	);
};
export default PeopleAlsoBought;
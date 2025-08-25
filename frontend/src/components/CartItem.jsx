import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item, isLastItem }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
		<div className={`py-4 ${!isLastItem ? "border-b border-gray-200" : ""}`}>
			<div className='flex items-center justify-between gap-4'>
				<div className='flex items-center gap-4'>
					<div className='shrink-0'>
						<img
							className='h-20 w-20 md:h-24 md:w-24 rounded-lg object-cover'
							src={item.image}
							alt={item.name}
						/>
					</div>
					<div className='flex-1'>
						<p className='text-base font-medium text-gray-800 hover:text-emerald-600 transition-colors'>
							{item.name}
						</p>
						<p className='text-sm text-gray-500 line-clamp-2'>{item.description}</p>
					</div>
				</div>

				<div className='flex items-center gap-4 md:gap-8'>
					<div className='flex items-center gap-2'>
						<button
							className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300
                             bg-white hover:bg-gray-100 transition-colors'
							onClick={() => updateQuantity(item._id, item.quantity - 1)}
							disabled={item.quantity <= 1}
						>
							<Minus className='h-4 w-4 text-gray-600' />
						</button>
						<p className='w-8 text-center font-medium'>{item.quantity}</p>
						<button
							className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300
                             bg-white hover:bg-gray-100 transition-colors'
							onClick={() => updateQuantity(item._id, item.quantity + 1)}
						>
							<Plus className='h-4 w-4 text-gray-600' />
						</button>
					</div>
					<p className='text-base font-bold text-emerald-600 w-20 text-right'>
						${(item.price * item.quantity).toFixed(2)}
					</p>
					<button
						className='text-gray-400 hover:text-red-500 transition-colors'
						onClick={() => removeFromCart(item._id)}
						title='Remove item'
					>
						<Trash2 size={20} />
					</button>
				</div>
			</div>
		</div>
	);
};
export default CartItem;
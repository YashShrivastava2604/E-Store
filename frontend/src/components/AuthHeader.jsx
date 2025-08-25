import { Link } from "react-router-dom";
import { UserPlus, LogIn } from "lucide-react";

const AuthHeader = ({ authType }) => {
	return (
		<header className='absolute top-0 left-0 w-full z-20'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-20'>
					<Link to='/' className='text-3xl font-bold text-emerald-500 ' style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)"}}>
						E-Store
					</Link>

					{authType === "login" && (
						<Link
							to={"/signup"}
							className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg flex items-center transition duration-300 ease-in-out text-sm font-medium shadow-md'
						>
							<UserPlus className='mr-2' size={18} /> Sign Up
						</Link>
					)}

					{authType === "signup" && (
						<Link
							to={"/login"}
							className='bg-emerald-600 hover:bg-emerald-700 backdrop-blur-sm text-white py-2 px-4 rounded-lg flex items-center transition-colors duration-300 ease-in-out text-sm font-medium'
						>
							<LogIn className='mr-2' size={18} /> Login
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default AuthHeader;
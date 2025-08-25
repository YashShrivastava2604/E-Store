import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import SplineRobot from "../components/SplineRobot";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	return (
		<div className='w-full min-h-screen flex items-center justify-center bg-gray-100 p-4'>
			<div className='relative w-full max-w-6xl h-[700px] grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden'>
				<div className='relative w-full h-full hidden md:block'>
					<SplineRobot pageState={"LoginState"} />
				</div>
				<div className='flex flex-col justify-center p-8 sm:p-12'>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h2 className='text-3xl md:text-4xl font-extrabold text-gray-900'>Welcome Back!</h2>
						<p className='mt-2 text-gray-600'>Sign in to continue to your account.</p>
					</motion.div>
					<motion.div
						className='mt-8'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<form onSubmit={handleSubmit} className='space-y-6'>
							<div>
								<label htmlFor='email' className='block text-sm font-medium text-gray-700'>
									Email address
								</label>
								<div className='mt-1 relative rounded-md shadow-sm'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
									</div>
									<input
										id='email'
										type='email'
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className='block w-full px-3 py-3 pl-10 bg-gray-50 border border-gray-300 text-gray-900
										rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
										focus:border-emerald-500 sm:text-sm'
										placeholder='you@example.com'
									/>
								</div>
							</div>
							<div>
								<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
									Password
								</label>
								<div className='mt-1 relative rounded-md shadow-sm'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
									</div>
									<input
										id='password'
										type='password'
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className='block w-full px-3 py-3 pl-10 bg-gray-50 border border-gray-300 text-gray-900
										rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
										placeholder='••••••••'
									/>
								</div>
							</div>
							<button
								type='submit'
								className='w-full flex justify-center py-3 px-4 border border-transparent 
								rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
								hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
								focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
								disabled={loading}
							>
								{loading ? (
									<>
										<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
										Signing in...
									</>
								) : (
									<>
										<LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
										Sign In
									</>
								)}
							</button>
						</form>
						<p className='mt-8 text-center text-sm text-gray-600'>
							Not a member?{" "}
							<Link to='/signup' className='font-medium text-emerald-600 hover:text-emerald-500'>
								Sign up now <ArrowRight className='inline h-4 w-4' />
							</Link>
						</p>
					</motion.div>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;
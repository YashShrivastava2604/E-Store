import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import AuthHeader from "../components/AuthHeader";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	return (
		<div className='w-full min-h-screen flex items-center justify-center relative p-4 md:p-8 overflow-hidden'>
			<AuthHeader authType='login' />

			<motion.div
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.7, ease: "easeOut" }}
				className='relative z-10 w-full max-w-md p-8 bg-emerald-200/10 backdrop-blur-[0.05rem] border border-white/20 rounded-2xl shadow-2xl'
			>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.1 }}
				>
					<h2 className='text-3xl md:text-4xl font-extrabold text-emerald-600'>Welcome Back!</h2>
					<p className='mt-2 text-black/50'>Sign in to continue to your account.</p>
				</motion.div>

				<motion.div
					className='mt-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label htmlFor='email' className='block text-sm font-medium text-black/40'>
								Email address
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-black/40' aria-hidden='true' />
								</div>
								<input
									id='email'
									type='email'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='block w-full px-3 py-3 pl-10 bg-black/20 border border-white/30 text-black/60
									rounded-md shadow-sm placeholder-black/30 focus:outline-none focus:ring-2 
									focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all'
									placeholder='you@example.com'
								/>
							</div>
						</div>
						<div>
							<label htmlFor='password' className='block text-sm font-medium text-black/30'>
								Password
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-black/40' aria-hidden='true' />
								</div>
								<input
									id='password'
									type='password'
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='block w-full px-3 py-3 pl-10 bg-black/20 border border-white/30 text-black/60
									rounded-md shadow-sm placeholder-black/40 focus:outline-none 
									 focus:border-emerald-500 sm:text-sm transition-all'
									placeholder='••••••••'
								/>
							</div>
						</div>
						<button
							type='submit'
							className='w-full flex justify-center py-3 px-4 border border-transparent 
							rounded-md shadow-lg text-sm font-medium text-white bg-emerald-600
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
					<p className='mt-8 text-center text-sm text-black/50 font-bold'>
						Not a member?{" "}
						<Link to='/signup' className='text-lg font-medium text-emerald-500 hover:text-emerald-600 transition-colors'>
							Sign up now <ArrowRight className='inline h-4 w-4' />
						</Link>
					</p>
				</motion.div>
			</motion.div>
		</div>
	);
};
export default LoginPage;
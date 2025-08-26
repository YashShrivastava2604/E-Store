import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import AuthHeader from "../components/AuthHeader";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const { signup, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
	};

	return (
		<div className='w-full min-h-screen flex items-center justify-center relative p-4 md:p-8 overflow-hidden'>
			<AuthHeader authType='signup' />

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
					<h2 className='text-3xl md:text-4xl font-extrabold text-emerald-500'>Create Your Account</h2>
					<p className='mt-2 text-black/30'>Join us and explore the future of fashion.</p>
				</motion.div>

				<motion.div
					className='mt-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label htmlFor='name' className='block text-sm font-medium text-black/50'>
								Full name
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<User className='h-5 w-5 text-black/30' aria-hidden='true' />
								</div>
								<input
									id='name'
									type='text'
									required
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className='block w-full px-3 py-3 pl-10 bg-black/20 border border-white/30 text-black/60 rounded-md shadow-sm
									placeholder-black/30 focus:outline-none focus:ring-2  focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all'
									placeholder='John Doe'
								/>
							</div>
						</div>
						<div>
							<label htmlFor='email' className='block text-sm font-medium text-black/50'>
								Email address
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-black/30' aria-hidden='true' />
								</div>
								<input
									id='email'
									type='email'
									required
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									className='block w-full px-3 py-3 pl-10 bg-black/20 border border-white/30 text-black/60
									rounded-md shadow-sm placeholder-black/30 focus:outline-none focus:ring-2 
									focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all'
									placeholder='you@example.com'
								/>
							</div>
						</div>
						<div>
							<label htmlFor='password' className='block text-sm font-medium text-black/50'>
								Password
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-black/30' aria-hidden='true' />
								</div>
								<input
									id='password'
									type='password'
									required
									value={formData.password}
									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
									className='block w-full px-3 py-3 pl-10 bg-black/20 border border-white/30 text-black/60
									rounded-md shadow-sm placeholder-black/30 focus:outline-none focus:ring-2 
									focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all'
									placeholder='••••••••'
								/>
							</div>
						</div>
						<button
							type='submit'
							className='w-full flex justify-center py-3 px-4 border border-transparent 
							rounded-md shadow-lg text-sm font-medium text-white bg-emerald-600
							hover:bg-emerald-700 focus:outline-none focus:ring-2 
							focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
									Creating Account...
								</>
							) : (
								<>
									<UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
									Sign Up
								</>
							)}
						</button>
					</form>
					<p className='mt-8 text-center text-sm text-black/50 font-bold'>
						Already have an account?{" "}
						<Link to='/login' className='font-medium text-lg text-emerald-500 hover:text-emerald-600 transition-colors'>
							Login here <ArrowRight className='inline h-4 w-4' />
						</Link>
					</p>
				</motion.div>
			</motion.div>
		</div>
	);
};
export default SignUpPage;
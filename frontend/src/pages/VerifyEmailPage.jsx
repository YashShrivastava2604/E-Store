import { useState } from "react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { Loader, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";
import AuthHeader from "../components/AuthHeader";

const VerifyEmailPage = () => {
	const [otp, setOtp] = useState("");
	const { verifyOtp, loading } = useUserStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!otp.trim() || otp.length !== 6) {
			toast.error("Please enter the 6-digit OTP");
			return;
		}
		await verifyOtp(otp);
	};

	return (
		<div className='w-full min-h-screen flex items-center justify-center relative p-4 md:p-8 overflow-hidden'>
			<AuthHeader />

			<motion.div
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.7, ease: "easeOut" }}
				className='relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl'
			>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.1 }}
				>
					<h2 className='text-3xl md:text-4xl font-extrabold text-emerald-500'>Check Your Email</h2>
					<p className='mt-2 text-black/30'>Enter the 6-digit code we sent you to verify your account.</p>
				</motion.div>

				<motion.div
					className='mt-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label htmlFor='otp' className='block text-sm font-medium text-black/50'>
								Verification Code
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<ShieldCheck className='h-5 w-5 text-black/30' aria-hidden='true' />
								</div>
								<input
									id='otp'
									type='text'
									required
									value={otp}
									onChange={(e) => setOtp(e.target.value)}
									className='block w-full px-3 py-3 pl-10 bg-black/20 border border-white/30 text-black/60
									rounded-md shadow-sm placeholder-black/30 focus:outline-none focus:ring-2 
									focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all text-center tracking-[0.5em]'
									placeholder='_ _ _ _ _ _'
									maxLength={6}
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
									Verifying...
								</>
							) : (
								<>
									<ShieldCheck className='mr-2 h-5 w-5' aria-hidden='true' />
									Verify Account
								</>
							)}
						</button>
					</form>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default VerifyEmailPage;
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { Loader, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";

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
		<div className='min-h-[calc(100vh-10rem)] flex flex-col justify-center items-center p-4 bg-gray-100'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md text-center'>
				<h2 className='text-3xl font-extrabold text-gray-900'>
					Verify your Email
				</h2>
				<p className='mt-2 text-gray-600'>
					Enter the 6-digit code sent to your email address.
				</p>
			</div>
			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label
								htmlFor='otp'
								className='block text-sm font-medium text-gray-700'
							>
								Verification Code
							</label>
							<div className='mt-1'>
								<input
									id='otp'
									type='text'
									value={otp}
									onChange={(e) => setOtp(e.target.value)}
									required
									className='block w-full px-3 py-3 bg-gray-50 border border-gray-300 text-gray-900
                                    rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
                                    focus:border-emerald-500 sm:text-sm text-center tracking-[0.5em]'
									placeholder='_ _ _ _ _ _'
									maxLength={6}
								/>
							</div>
						</div>
						<button
							type='submit'
							disabled={loading}
							className='w-full flex justify-center py-3 px-4 border border-transparent 
                            rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
                            hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                            focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
						>
							{loading ? (
								<>
									<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
									Verifying...
								</>
							) : (
								<>
									<ShieldCheck className='mr-2 h-5 w-5' aria-hidden='true' />
									Verify
								</>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default VerifyEmailPage;
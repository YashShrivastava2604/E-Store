import { Github, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		// Added frosted glass effect to match the rest of the site's aesthetic
		<footer className='bg-white/50 backdrop-blur-lg border-t border-white/30'>
			<div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
				<div className='xl:grid xl:grid-cols-3 xl:gap-8'>
					<div className='space-y-8 xl:col-span-1'>
						<Link to='/' className='text-3xl font-bold text-emerald-600'>
							E-Store
						</Link>
						<p className='text-gray-500 text-base'>The future of eco-friendly fashion is here.</p>
						<div className='flex space-x-6'>
							<a href='#' className='text-gray-400 hover:text-gray-500'>
								<Github />
							</a>
							<a href='#' className='text-gray-400 hover:text-gray-500'>
								<Twitter />
							</a>
							<a href='#' className='text-gray-400 hover:text-gray-500'>
								<Mail />
							</a>
						</div>
					</div>
					<div className='mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2'>
						<div className='md:grid md:grid-cols-2 md:gap-8'>
							<div>
								<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>Solutions</h3>
								<ul className='mt-4 space-y-4'>
									<li>
										<a href='#' className='text-base text-gray-500 hover:text-gray-900'>
											Marketing
										</a>
									</li>
									<li>
										<a href='#' className='text-base text-gray-500 hover:text-gray-900'>
											Analytics
										</a>
									</li>
								</ul>
							</div>
							<div className='mt-12 md:mt-0'>
								<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>Support</h3>
								<ul className='mt-4 space-y-4'>
									<li>
										<a href='#' className='text-base text-gray-500 hover:text-gray-900'>
											Pricing
										</a>
									</li>
									<li>
										<a href='#' className='text-base text-gray-500 hover:text-gray-900'>
											Guides
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className='md:grid md:grid-cols-2 md:gap-8'>
							<div>
								<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>Company</h3>
								<ul className='mt-4 space-y-4'>
									<li>
										<a href='#' className='text-base text-gray-500 hover:text-gray-900'>
											About
										</a>
									</li>
									<li>
										<a href='#' className='text-base text-gray-500 hover:text-gray-900'>
											Blog
										</a>
									</li>
								</ul>
							</div>
							<div className='mt-12 md:mt-0'>
								<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>Legal</h3>
								<ul className='mt-4 space-y-4'>
									<li>
										<a href='#' className='text-base text-gray-500 hover:text-gray-900'>
											Claim
										</a>
									</li>
									<li>
										<a href='#' className='text-base text-gray-500 hover:text-gray-900'>
											Privacy
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className='mt-12 border-t border-gray-200 pt-8'>
					<p className='text-base text-gray-400 xl:text-center'>
						&copy; 2025 E-Store, Inc. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
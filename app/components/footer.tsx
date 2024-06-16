import { HomeIcon } from "@radix-ui/react-icons";
/* eslint-disable jsx-a11y/anchor-is-valid */ // Remove this when you add the href values
export const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer id="footer">
			<hr className="mx-auto w-11/12" />

			<section className="container grid grid-cols-2 gap-x-12 gap-y-8 py-20 md:grid-cols-4 xl:grid-cols-6">
				<div className="col-span-full xl:col-span-2">
					<a
						rel="noreferrer noopener"
						href="/"
						className="flex items-center text-xl font-bold"
					>
						<HomeIcon className="text-white-900 h-6 w-6 dark:text-white" />
						<span className="text-white-900 ml-2 text-lg font-bold dark:text-white">
							Remix Starter
						</span>
					</a>
				</div>

				{/* TODO: Complete the href values with what you need */}
				<div className="flex flex-col gap-2">
					<h3 className="text-lg font-bold">Follow Us</h3>
					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							GitHub
						</a>
					</div>

					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							Twitter
						</a>
					</div>

					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							Facebook
						</a>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="text-lg font-bold">Platforms</h3>
					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							Web
						</a>
					</div>

					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							Mobile
						</a>
					</div>

					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							Desktop
						</a>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="text-lg font-bold">About</h3>
					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							Features
						</a>
					</div>

					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							Pricing
						</a>
					</div>

					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							FAQ
						</a>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="text-lg font-bold">Community</h3>
					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							Youtube
						</a>
					</div>

					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							Discord
						</a>
					</div>

					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							Twitch
						</a>
					</div>
				</div>
			</section>

			<section className="container pb-14 text-center">
				<h3 className="text-lg leading-6">
					&copy; {currentYear} Remix Template Starter By{" "}
					<a
						rel="noreferrer noopener"
						target="_blank"
						href="https://github.com/aliabudal"
						className="text-lg text-blue-600 underline hover:text-blue-800"
						style={{ fontSize: "inherit" }}
					>
						Ali Abudal
					</a>
				</h3>
			</section>
		</footer>
	);
};

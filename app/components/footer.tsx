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
						className="flex text-xl font-bold"
					>
						Your Logo Here
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
				<h3>
					&copy; {currentYear} Remix Template Starter By{" "}
					<a
						rel="noreferrer noopener"
						target="_blank"
						href="https://github.com/aliabudal"
						className="border-primary text-primary transition-all hover:border-b-2"
					>
						Ali Abudal
					</a>
				</h3>
			</section>
		</footer>
	);
};

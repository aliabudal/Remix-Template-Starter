import { HoverEffect } from "@/components/ui/card-hover-effect";

export function UsedByClients() {
	return (
		<section
			id="howItWorks"
			className="container py-24 text-center sm:py-32"
		>
			<h2 className="text-3xl font-bold md:text-4xl ">
				Used by{" "}
				<span className="bg-gradient-to-b from-blue-500 to-blue-700 bg-clip-text text-transparent">
					clients{" "}
				</span>
				like the following
			</h2>
			<p className="mx-auto mb-8 mt-4 text-xl text-muted-foreground md:w-3/4">
				Those are some of the clients that use our platform.
			</p>
			<div className="mx-auto max-w-5xl px-8">
				<HoverEffect items={projects} />
			</div>
		</section>
	);
}
export const projects = [
	{
		title: "Stripe",
		description:
			"A technology company that builds economic infrastructure for the internet.",
		link: "https://stripe.com",
	},
	{
		title: "Netflix",
		description:
			"A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
		link: "https://netflix.com",
	},
	{
		title: "Google",
		description:
			"A multinational technology company that specializes in Internet-related services and products.",
		link: "https://google.com",
	},
	{
		title: "Meta",
		description:
			"A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
		link: "https://meta.com",
	},
	{
		title: "Amazon",
		description:
			"A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
		link: "https://amazon.com",
	},
	{
		title: "Microsoft",
		description:
			"A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
		link: "https://microsoft.com",
	},
];

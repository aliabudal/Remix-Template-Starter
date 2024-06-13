import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
	FaAmazon,
	FaTwitter,
	FaFacebook,
	FaGoogle,
	FaMicrosoft,
	FaYoutube,
} from "react-icons/fa";

export function UsedByClients() {
	return (
		<section
			id="howItWorks"
			className="container py-24 text-center sm:py-32"
		>
			<h2 className="text-3xl font-bold md:text-4xl ">
				Popular{" "}
				<span className="bg-gradient-to-b from-blue-500 to-blue-700 bg-clip-text text-transparent">
					companies{" "}
				</span>
				like the following
			</h2>
			<p className="mx-auto mb-8 mt-4 text-xl text-muted-foreground md:w-3/4">
				A list of popular companies to showcase the hover effect.
			</p>
			<div className="mx-auto max-w-5xl px-8">
				<HoverEffect items={projects} />
			</div>
		</section>
	);
}
export const projects = [
	{
		title: "Youtube",
		description:
			"A technology company focusing on video sharing, streaming and social media.",
		link: "https://youtube.com",
		image: <FaYoutube size="4em" />,
	},
	{
		title: "Twitter",
		description:
			"A technology company that focuses on building products that advance X's mission of bringing the world closer together.",
		link: "https://x.com",
		image: <FaTwitter size="4em" />,
	},
	{
		title: "Google",
		description:
			"A multinational technology company that specializes in Internet-related services and products.",
		link: "https://google.com",
		image: <FaGoogle size="4em" />,
	},
	{
		title: "Meta",
		description:
			"A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
		link: "https://meta.com",
		image: <FaFacebook size="4em" />,
	},
	{
		title: "Amazon",
		description:
			"A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
		link: "https://amazon.com",
		image: <FaAmazon size="4em" />,
	},
	{
		title: "Microsoft",
		description:
			"A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
		link: "https://microsoft.com",
		image: <FaMicrosoft size="4em" />,
	},
];

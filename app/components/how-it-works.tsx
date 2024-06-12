import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "@/components/icons";

interface FeatureProps {
	icon: JSX.Element;
	title: string;
	description: string;
}

const features: FeatureProps[] = [
	{
		icon: <MedalIcon />,
		title: "Accessibility",
		description:
			"Our platform is designed to be accessible to all users, ensuring a seamless experience for everyone.",
	},
	{
		icon: <MapIcon />,
		title: "Community",
		description:
			"Join our vibrant community and connect with like-minded individuals from around the world.",
	},
	{
		icon: <PlaneIcon />,
		title: "Scalability",
		description:
			"Our infrastructure is built to scale, allowing you to grow your presence without any limitations.",
	},
	{
		icon: <GiftIcon />,
		title: "Gamification",
		description:
			"Engage with our platform through fun and rewarding gamification elements that keep you motivated.",
	},
];

export const HowItWorks = () => {
	return (
		<section
			id="howItWorks"
			className="container py-24 text-center sm:py-32"
		>
			<h2 className="text-3xl font-bold md:text-4xl ">
				What we{" "}
				<span className="bg-gradient-to-b from-blue-500 to-blue-700 bg-clip-text text-transparent">
					offer{" "}
				</span>
				for our clients
			</h2>
			<p className="mx-auto mb-8 mt-4 text-xl text-muted-foreground md:w-3/4">
				Those are part of the features that we offer to our clients.
			</p>

			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
				{features.map(({ icon, title, description }: FeatureProps) => (
					<Card key={title} className="bg-muted/50">
						<CardHeader>
							<CardTitle className="grid place-items-center gap-4">
								{icon}
								{title}
							</CardTitle>
						</CardHeader>
						<CardContent>{description}</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
};

import { cn } from "@/lib/styles";
import Marquee from "@/components/ui/marquee";

const reviews = [
	{
		name: "Jack",
		username: "@jack",
		body: "I've never seen anything like this before. It's amazing. I love it.",
		img: "https://avatar.vercel.sh/jack",
	},
	{
		name: "Jill",
		username: "@jill",
		body: "I don't know what to say. I'm speechless. This is amazing.",
		img: "https://avatar.vercel.sh/jill",
	},
	{
		name: "John",
		username: "@john",
		body: "I'm at a loss for words. This is amazing. I love it.",
		img: "https://avatar.vercel.sh/john",
	},
	{
		name: "Jane",
		username: "@jane",
		body: "I'm at a loss for words. This is amazing. I love it.",
		img: "https://avatar.vercel.sh/jane",
	},
	{
		name: "Jenny",
		username: "@jenny",
		body: "I'm at a loss for words. This is amazing. I love it.",
		img: "https://avatar.vercel.sh/jenny",
	},
	{
		name: "James",
		username: "@james",
		body: "I'm at a loss for words. This is amazing. I love it.",
		img: "https://avatar.vercel.sh/james",
	},
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
	img,
	name,
	username,
	body,
}: {
	img: string;
	name: string;
	username: string;
	body: string;
}) => {
	return (
		<figure
			className={cn(
				"relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
				// light styles
				"border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
				// dark styles
				"dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
			)}
		>
			<div className="flex flex-row items-center gap-2">
				<img
					className="rounded-full"
					width="32"
					height="32"
					alt=""
					src={img}
				/>
				<div className="flex flex-col">
					<figcaption className="text-sm font-medium dark:text-white">
						{name}
					</figcaption>
					<p className="text-xs font-medium dark:text-white/40">
						{username}
					</p>
				</div>
			</div>
			<blockquote className="mt-2 text-sm">{body}</blockquote>
		</figure>
	);
};

export function Sponsors() {
	return (
		<>
			<section
				id="howItWorks"
				className="container py-2 text-center sm:py-2"
			>
				<h2 className="text-3xl font-bold md:text-4xl ">
					What our{" "}
					<span className="bg-gradient-to-b from-blue-500 to-blue-700 bg-clip-text text-transparent">
						clients{" "}
					</span>
					say about us
				</h2>
				<p className="mx-auto mb-8 mt-4 text-xl text-muted-foreground md:w-3/4">
					Those are some of the reviews of our clients.
				</p>
			</section>
			<div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background py-20 md:shadow-xl">
				<Marquee pauseOnHover className="[--duration:20s]">
					{firstRow.map((review) => (
						<ReviewCard key={review.username} {...review} />
					))}
				</Marquee>
				<Marquee reverse pauseOnHover className="[--duration:20s]">
					{secondRow.map((review) => (
						<ReviewCard key={review.username} {...review} />
					))}
				</Marquee>
				<div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
				<div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
			</div>
			<div className="pb-20"></div>
		</>
	);
}

{
	/* <section
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
</section> */
}

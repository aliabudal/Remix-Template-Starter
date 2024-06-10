import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlanType {
	NO = 0,
	YES = 1,
}

interface PricingProps {
	title: string;
	popular: PopularPlanType;
	price: number;
	description: string;
	buttonText: string;
	benefitList: string[];
}

const pricingList: PricingProps[] = [
	{
		title: "Free",
		popular: 0,
		price: 0,
		description:
			"Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
		buttonText: "Get Started",
		benefitList: [
			"1 Team member",
			"2 GB Storage",
			"Upto 4 pages",
			"Community support",
			"lorem ipsum dolor",
		],
	},
	{
		title: "Premium",
		popular: 1,
		price: 5,
		description:
			"Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
		buttonText: "Start Free Trial",
		benefitList: [
			"4 Team member",
			"4 GB Storage",
			"Upto 6 pages",
			"Priority support",
			"lorem ipsum dolor",
		],
	},
	{
		title: "Enterprise",
		popular: 0,
		price: 40,
		description:
			"Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
		buttonText: "Contact Us",
		benefitList: [
			"10 Team member",
			"8 GB Storage",
			"Upto 10 pages",
			"Priority support",
			"lorem ipsum dolor",
		],
	},
];

export const Pricing = () => {
	return (
		<section id="pricing" className="container py-24 sm:py-32">
			<h2 className="text-center text-3xl font-bold md:text-4xl">
				Get
				<span className="bg-gradient-to-b from-blue-500 to-blue-700 bg-clip-text text-transparent">
					{" "}
					Unlimited{" "}
				</span>
				Access
			</h2>
			<h3 className="pb-8 pt-4 text-center text-xl text-muted-foreground">
				Choose one of our plans and start your journey today!
			</h3>
			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{pricingList.map((pricing: PricingProps) => (
					<Card
						key={pricing.title}
						className={
							pricing.popular === PopularPlanType.YES
								? "shadow-black/10 drop-shadow-xl dark:shadow-white/10"
								: ""
						}
					>
						<CardHeader>
							<CardTitle className="item-center flex justify-between">
								{pricing.title}
								{pricing.popular === PopularPlanType.YES ? (
									<Badge
										variant="secondary"
										className="absolute -top-0.5 right-0 bg-green-500 text-sm text-primary"
									>
										Most popular
									</Badge>
								) : null}
							</CardTitle>
							<div>
								<span className="text-3xl font-bold">
									${pricing.price}
								</span>
								<span className="text-muted-foreground">
									{" "}
									/month
								</span>
							</div>

							<CardDescription>
								{pricing.description}
							</CardDescription>
						</CardHeader>

						<CardContent>
							<Button className="w-full">
								{pricing.buttonText}
							</Button>
						</CardContent>

						<hr className="m-auto mb-4 w-4/5" />

						<CardFooter className="flex">
							<div className="space-y-4">
								{pricing.benefitList.map((benefit: string) => (
									<span key={benefit} className="flex">
										<Check className="text-green-500" />{" "}
										<h3 className="ml-2">{benefit}</h3>
									</span>
								))}
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</section>
	);
};

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/styles";
import { Link } from "@remix-run/react";

type PricingSwitchProps = {
	onSwitch: (value: string) => void;
};

type PricingCardProps = {
	isYearly?: boolean;
	title: string;
	monthlyPrice?: number;
	yearlyPrice?: number;
	description: string;
	features: string[];
	actionLabel: string;
	popular?: boolean;
	exclusive?: boolean;
};

const PricingHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<section className="text-center">
		<h2 className="text-3xl font-bold">{title}</h2>
		<p className="pt-1 text-xl">{subtitle}</p>
		<br />
	</section>
);

const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
	<Tabs defaultValue="0" className="mx-auto w-40" onValueChange={onSwitch}>
		<TabsList className="px-2 py-6">
			<TabsTrigger value="0" className="text-base">
				Monthly
			</TabsTrigger>
			<TabsTrigger value="1" className="text-base">
				Yearly
			</TabsTrigger>
		</TabsList>
	</Tabs>
);

const PricingCard = ({
	isYearly,
	title,
	monthlyPrice,
	yearlyPrice,
	description,
	features,
	actionLabel,
	popular,
	exclusive,
}: PricingCardProps) => (
	<Card
		className={cn(
			`flex w-72 flex-col justify-between py-1 ${popular ? "border-rose-400" : "border-zinc-700"} mx-auto sm:mx-0`,
			{
				"animate-background-shine bg-white bg-[length:200%_100%] transition-colors dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]":
					exclusive,
			}
		)}
	>
		<div>
			<CardHeader className="pb-8 pt-4">
				{isYearly && yearlyPrice && monthlyPrice ? (
					<div className="flex justify-between">
						<CardTitle className="text-lg">{title}</CardTitle>
					</div>
				) : (
					<CardTitle className="text-lg">{title}</CardTitle>
				)}
				<div className="flex gap-0.5">
					<h3 className="text-3xl font-bold">
						{yearlyPrice && isYearly
							? "$" + yearlyPrice
							: monthlyPrice
								? "$" + monthlyPrice
								: "Custom"}
					</h3>
					<span className="mb-1 flex flex-col justify-end text-sm">
						{yearlyPrice && isYearly
							? "/year"
							: monthlyPrice
								? "/month"
								: null}
					</span>
				</div>
				<CardDescription className="h-12 pt-1.5">
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{features.map((feature: string) => (
					<CheckItem key={feature} text={feature} />
				))}
			</CardContent>
		</div>
		<CardFooter className="mt-2">
			<Link to="/payment">
				<Button className="relative inline-flex w-full items-center justify-center rounded-md  px-6 font-medium transition-colors  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
					<div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b opacity-75 blur" />
					{actionLabel}
				</Button>
			</Link>
		</CardFooter>
	</Card>
);

const CheckItem = ({ text }: { text: string }) => (
	<div className="flex gap-2">
		<CheckCircle2 size={18} className="my-auto text-green-400" />
		<p className="pt-0.5 text-sm">{text}</p>
	</div>
);

export function AvailablePlans() {
	const [isYearly, setIsYearly] = useState(false);
	const togglePricingPeriod = (value: string) =>
		setIsYearly(parseInt(value) === 1);

	const plans = [
		{
			title: "Basic",
			monthlyPrice: 10,
			yearlyPrice: 100,
			description: "Essential features you need to get started",
			features: [
				"Example Feature Number 1",
				"Example Feature Number 2",
				"Example Feature Number 3",
			],
			actionLabel: "Get Started",
		},
		{
			title: "Pro",
			monthlyPrice: 25,
			yearlyPrice: 250,
			description: "Perfect for owners of small & medium businessess",
			features: [
				"Example Feature Number 1",
				"Example Feature Number 2",
				"Example Feature Number 3",
			],
			actionLabel: "Get Started",
			popular: true,
		},
		{
			title: "Enterprise",
			price: "Custom",
			description:
				"Dedicated support and infrastructure to fit your needs",
			features: [
				"Example Feature Number 1",
				"Example Feature Number 2",
				"Example Feature Number 3",
				"Super Exclusive Feature",
			],
			actionLabel: "Contact Sales",
			exclusive: true,
		},
	];
	return (
		<div className="py-8">
			<PricingHeader
				title="Pricing Plans"
				subtitle="Choose the plan that's right for you"
			/>
			<PricingSwitch onSwitch={togglePricingPeriod} />
			<section className="mt-8 flex flex-col justify-center gap-8 sm:flex-row sm:flex-wrap">
				{plans.map((plan) => {
					return (
						<PricingCard
							key={plan.title}
							{...plan}
							isYearly={isYearly}
						/>
					);
				})}
			</section>
		</div>
	);
}

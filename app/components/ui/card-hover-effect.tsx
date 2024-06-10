import { cn } from "@/lib/styles";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@remix-run/react";
import { useState } from "react";

export const HoverEffect = ({
	items,
	className,
}: {
	items: {
		title: string;
		description: string;
		link: string;
	}[];
	className?: string;
}) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div
			className={cn(
				"grid grid-cols-1 py-10  md:grid-cols-2  lg:grid-cols-3",
				className
			)}
		>
			{items.map((item, idx) => (
				<Link
					to={item?.link}
					key={item?.link}
					className="group relative  block h-full w-full p-2"
					onMouseEnter={() => setHoveredIndex(idx)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<AnimatePresence>
						{hoveredIndex === idx && (
							<motion.span
								className="absolute inset-0 block h-full w-full rounded-3xl bg-blue-500"
								layoutId="hoverBackground"
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: { duration: 0.15 },
								}}
								exit={{
									opacity: 0,
									transition: { duration: 0.15, delay: 0.2 },
								}}
							/>
						)}
					</AnimatePresence>
					<Card>
						<CardTitle>{item.title}</CardTitle>
						<CardDescription>{item.description}</CardDescription>
					</Card>
				</Link>
			))}
		</div>
	);
};

export const Card = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"relative z-20 h-full w-full overflow-hidden rounded-2xl border-2 p-4",
				"border-[color:var(--theme-light-border,hsl(var(--zinc-300)))] dark:border-[color:var(--theme-dark-border,hsl(var(--zinc-700-dark)))]",
				"group-hover:border-[color:var(--theme-light-border-hover,hsl(var(--zinc-400)))] dark:group-hover:border-[color:var(--theme-dark-border-hover,hsl(var(--zinc-600-dark)))]",
				className
			)}
		>
			<div className="relative z-50">
				<div className="p-4">{children}</div>
			</div>
		</div>
	);
};
export const CardTitle = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<h4
			className={cn(
				"mt-4 font-bold tracking-wide",
				"text-[color:var(--theme-light,hsl(var(--zinc-500)))] dark:text-[color:var(--theme-dark,hsl(var(--zinc-100-dark)))]",
				className
			)}
		>
			{children}
		</h4>
	);
};
export const CardDescription = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<p
			className={cn(
				"mt-8 text-sm leading-relaxed tracking-wide",
				"text-[color:var(--theme-light,hsl(var(--zinc-500)))] dark:text-[color:var(--theme-dark,hsl(var(--zinc-100-dark)))]",
				className
			)}
		>
			{children}
		</p>
	);
};

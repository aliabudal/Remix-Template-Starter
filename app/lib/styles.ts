import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function themeBorder(...inputs: ClassValue[]) {
	return cn(
		"overflow-hidden rounded-lg shadow-md",
		"bg-[color:var(--theme-light,hsl(var(--zinc-100)))] dark:bg-[color:var(--theme-dark,hsl(var(--zinc-800-dark)))]",
		"border border-[color:var(--theme-light-border,hsl(var(--zinc-300)))] dark:border-[color:var(--theme-dark-border,hsl(var(--zinc-700-dark)))]",
		"p-6",
		...inputs
	);
}

import {
	ExitIcon,
	LaptopIcon,
	MoonIcon,
	SunIcon,
	PersonIcon,
	BackpackIcon,
	HomeIcon,
} from "@radix-ui/react-icons";
import { Form, Link } from "@remix-run/react";
import * as React from "react";
import { useHydrated } from "remix-utils/use-hydrated";

import {
	getTheme,
	setTheme as setSystemTheme,
} from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header({
	isAuthenticated,
}: {
	isAuthenticated: boolean | undefined;
}) {
	const hydrated = useHydrated();
	const [, rerender] = React.useState({});
	const setTheme = React.useCallback((theme: string) => {
		setSystemTheme(theme);
		rerender({});
	}, []);
	const theme = getTheme();

	return (
		<>
			<Form id="logout-form" method="POST" action="/logout" />
			<Form id="account-form" method="GET" action="/account" />
			<header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 flex items-center justify-between border-b px-4 py-2 backdrop-blur md:py-4">
				<div className="flex items-center space-x-4">
					<Link className="flex items-center space-x-2" to="/">
						<span className="flex items-center">
							<HomeIcon className="text-white-900 h-6 w-6 dark:text-white" />
							<span className="text-white-900 ml-2 text-lg font-bold dark:text-white">
								Remix Starter
							</span>
						</span>
					</Link>
				</div>
				<div className="flex items-center space-x-4">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className="h-10 w-10 rounded-full border"
								size="icon"
								variant="ghost"
								title="Theme selector"
							>
								<span className="sr-only">Theme selector</span>
								{!hydrated ? null : theme === "dark" ? (
									<MoonIcon />
								) : theme === "light" ? (
									<SunIcon />
								) : (
									<LaptopIcon />
								)}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="mt-2">
							<DropdownMenuLabel>Theme</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<button
									type="button"
									className="w-full"
									onClick={() => setTheme("light")}
									aria-pressed={theme === "light"}
								>
									Light
								</button>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<button
									type="button"
									className="w-full"
									onClick={() => setTheme("dark")}
									aria-pressed={theme === "dark"}
								>
									Dark
								</button>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<button
									type="button"
									className="w-full"
									onClick={() => setTheme("system")}
									aria-pressed={theme === "system"}
								>
									System
								</button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					{isAuthenticated && (
						<Link to="/products">
							<Button
								className="h-10 w-10 rounded-full border"
								size="icon"
								variant="ghost"
								title="Products"
							>
								<span className="sr-only">Products</span>
								<BackpackIcon />
							</Button>
						</Link>
					)}
					{isAuthenticated && (
						<Button
							form="account-form"
							type="submit"
							className="h-10 w-10 rounded-full border"
							size="icon"
							variant="ghost"
							title="Profile"
						>
							<span className="sr-only">Profile</span>
							<PersonIcon />
						</Button>
					)}
					{isAuthenticated && (
						<Button
							form="logout-form"
							type="submit"
							className="h-10 w-10 rounded-full border"
							size="icon"
							variant="ghost"
							title="Logout"
						>
							<span className="sr-only">Logout</span>
							<ExitIcon />
						</Button>
					)}
				</div>
			</header>
		</>
	);
}

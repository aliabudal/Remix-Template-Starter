import { Link } from "@remix-run/react";
import type { FC } from "react";
import { HobbyKnifeIcon } from "@radix-ui/react-icons";
import { CopyPackageInput } from "@/components/hero-section/copy-input";

export const HeroSection: FC = () => {
	return (
		<section className="max-w-8xl mx-auto flex flex-col items-center justify-center overflow-hidden px-4 py-12 sm:py-16 lg:px-20">
			<div className="flex flex-col gap-8">
				<div className="grid gap-8">
					<div className="flex flex-col items-center justify-center gap-4 text-center xl:max-w-[676px]">
						<h1 className="max-w-3xl text-4xl font-extrabold leading-none text-gray-900 dark:text-white lg:text-5xl xl:text-6xl">
							<span className="block">
								Build modern web applications with
							</span>
							<span className="mt-2 block text-cyan-700 dark:text-cyan-700">
								Remix Template Starter
							</span>
						</h1>
						<p className="max-w-3xl text-lg leading-normal text-gray-500 dark:text-gray-400 lg:text-xl">
							This template is a open-source project built mainly
							on top of Remix, TypeScript, Tailwind CSS, and Vite.
							It&apos;s a great starting point for building modern
							web applications.
						</p>
						<div className="mt-6 grid w-full max-w-xl grid-cols-1 gap-4">
							<CopyPackageInput value="npx create-remix@latest --template aliabudal/Remix-Template-Starter" />
							<div className="flex justify-center">
								<Link
									to="https://github.com/"
									className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-lg bg-blue-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
								>
									Get started{" "}
									<HobbyKnifeIcon className="ml-2 mt-1 h-4 w-4" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

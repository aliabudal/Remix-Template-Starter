import type { FC } from "react";
import { useState } from "react";
import { HobbyKnifeIcon } from "@radix-ui/react-icons";

interface Props {
	value: string;
}

export const CopyPackageInput: FC<Props> = ({ value }) => {
	const [isJustCopied, setJustCopied] = useState(false);

	const copyToClipboard = () => {
		setJustCopied(true);
		navigator.clipboard.writeText(value);
		setTimeout(() => setJustCopied(false), 2000);
	};

	return (
		<div className="group relative">
			<input
				type="text"
				readOnly
				value={value}
				onClick={copyToClipboard}
				className="block w-full cursor-pointer border p-3.5 pr-11 text-sm"
			/>
			<div className="absolute inset-y-0 right-0 flex items-center pr-3">
				<HobbyKnifeIcon className="group-hover:text-primary-700 h-5 w-5 cursor-pointer text-gray-500 dark:text-gray-400" />
			</div>
			<div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 transform rounded bg-gray-800 px-4 py-2 text-sm text-white group-hover:block">
				{isJustCopied ? "Copied!" : "Copy to clipboard"}
			</div>
		</div>
	);
};

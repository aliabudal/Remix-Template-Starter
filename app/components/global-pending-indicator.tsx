import { useNavigation } from "@remix-run/react";

import { cn } from "@/lib/styles";

export function GlobalPendingIndicator() {
	const navigation = useNavigation();
	const pending = navigation.state !== "idle";

	return (
		<div className={cn("fixed left-0 right-0 top-0", { hidden: !pending })}>
			<div className="h-0.5 w-full overflow-hidden bg-muted">
				<div className="origin-left-right animate-progress h-full w-full bg-muted-foreground" />
			</div>
		</div>
	);
}

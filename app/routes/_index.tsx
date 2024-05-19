import type { MetaFunction } from "@remix-run/node";
import { Input } from "~/components/ui/input";

export const meta: MetaFunction = () => {
    return [{ title: "Remix Template Starter" }];
};

export default function Index() {
    return <Input type="email" placeholder="Email" />;
}

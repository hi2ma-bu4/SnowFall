import { SnowFall } from "./main";

if (typeof window !== "undefined") {
	(window as any).SnowFall = SnowFall;
}

export default SnowFall;

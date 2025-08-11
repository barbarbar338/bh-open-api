import { cleanEnv, num, port, str, url } from "envalid";

const env = cleanEnv(process.env, {
	API_PREFIX: str({ default: "/api" }),
	PORT: port({ default: 5555 }),
	TTL_MINS: num({ default: 15 }),
	BH_API_KEY: str({
		desc: "API key from Brawlhalla",
	}),
	REDIS_URL: url({
		desc: "Redis URL",
	}),
});

export default {
	API_PREFIX: env.API_PREFIX,
	PORT: env.PORT,
	TTL_MINS: env.TTL_MINS,
	BH_API_KEY: env.BH_API_KEY,
	REDIS_URL: env.REDIS_URL,
};

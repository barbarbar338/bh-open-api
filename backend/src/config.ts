import { config } from "dotenv";

config();

export default {
	API_PREFIX: process.env.API_PREFIX ?? "/api",
	PORT: parseInt(process.env.PORT ?? "5555", 10),
	TTL_MINS: parseInt(process.env.TTL_MINS ?? "15", 10),
	BH_API_KEY: process.env.BH_API_KEY,
	REDIS_URL: process.env.REDIS_URL,
};

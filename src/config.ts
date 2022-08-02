import { config } from "dotenv";

config();

export default {
	API_VERSION: "/v1",
	BH_API_BASE: "https://api.brawlhalla.com",
	BH_API_KEY: process.env.BH_API_KEY as string,
	PORT: process.env.PORT as unknown as number,
	MONGODB_URI: process.env.MONGODB_URI as string,
	SYNC_PERIOD: 1000 * 60 * 15,
	SYNC_RATELIMIT: {
		points: 1,
		duration: 60 * 2,
	},
	SEASONAL_RANKED: "rotating",
};

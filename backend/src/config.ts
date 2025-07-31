import { config } from "dotenv";

config();

export default {
	API_VERSION: "/v2",
	BH_API_KEY: process.env.BH_API_KEY,
	PORT: 5555,
	MONGODB_URI: process.env.MONGODB_URI,
	SYNC_PERIOD: 1000 * 60 * 15,
	SYNC_RATELIMIT: {
		points: 1,
		duration: 60 * 2,
	},
};

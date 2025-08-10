import {
	BHAPIError,
	getBHIDFromName,
	getStatsByBHID,
	getStatsBySteamID,
	getStatsBySteamURL,
	PlayerStats,
} from "@barbarbar338/bhapi";
import {
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import { APIRes } from "api-types";
import { GetDataByBHIDDTO } from "src/dto/getDataByBHID.dto";
import { GetDataByNameDTO } from "src/dto/getDataByName.dto";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";

@Injectable()
export class StatsService {
	public returnPing(): APIRes<null> {
		return {
			statusCode: HttpStatus.OK,
			message: "Pong!",
			data: null,
		};
	}

	public async getStatsByID({
		brawlhalla_id,
	}: GetDataByBHIDDTO): Promise<APIRes<PlayerStats>> {
		try {
			const { data: statsData } = await getStatsByBHID(brawlhalla_id);

			return {
				statusCode: HttpStatus.OK,
				message: `${statsData.name} from API`,
				data: statsData,
			};
		} catch (error) {
			Logger.error(error, "StatsService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get stats for Brawlhalla ID ${brawlhalla_id}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get stats for Brawlhalla ID ${brawlhalla_id}`,
				);
		}
	}

	public async getStatsByName({
		name,
	}: GetDataByNameDTO): Promise<APIRes<PlayerStats>> {
		try {
			const brawlhalla_id = await getBHIDFromName(name);

			return this.getStatsByID({ brawlhalla_id });
		} catch (error) {
			Logger.error(error, "StatsService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get stats for Brawlhalla name ${name}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get stats for Brawlhalla name ${name}`,
				);
		}
	}

	public async getStatsBySteamID({
		steam_id,
	}: GetDataBySteamIDDTO): Promise<APIRes<PlayerStats>> {
		try {
			const { data: statsData } = await getStatsBySteamID(steam_id);

			return {
				statusCode: HttpStatus.OK,
				message: `${statsData.name} from API`,
				data: statsData,
			};
		} catch (error) {
			Logger.error(error, "StatsService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get stats for Steam ID ${steam_id}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get stats for Steam ID ${steam_id}`,
				);
		}
	}

	public async getStatsBySteamURL({
		steam_url,
	}: GetDataBySteamURLDTO): Promise<APIRes<PlayerStats>> {
		try {
			const { data: statsData } = await getStatsBySteamURL(steam_url);

			return {
				statusCode: HttpStatus.OK,
				message: `${statsData.name} from API`,
				data: statsData,
			};
		} catch (error) {
			Logger.error(error, "StatsService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get stats for Steam URL ${steam_url}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get stats for Steam URL ${steam_url}`,
				);
		}
	}
}

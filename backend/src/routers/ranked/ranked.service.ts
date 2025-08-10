import {
	BHAPIError,
	PlayerRanked,
	getBHIDFromName,
	getRankedByBHID,
	getRankedBySteamID,
	getRankedBySteamURL,
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
export class RankedService {
	public returnPing(): APIRes<null> {
		return {
			statusCode: HttpStatus.OK,
			message: "Pong!",
			data: null,
		};
	}

	public async getRankedByID({
		brawlhalla_id,
	}: GetDataByBHIDDTO): Promise<APIRes<PlayerRanked>> {
		try {
			const { data: rankedData } = await getRankedByBHID(brawlhalla_id);

			return {
				statusCode: HttpStatus.OK,
				message: `${rankedData.name} from API`,
				data: rankedData,
			};
		} catch (error) {
			Logger.error(error, "RankedService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get ranked data for Brawlhalla ID ${brawlhalla_id}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get ranked data for Brawlhalla ID ${brawlhalla_id}`,
				);
		}
	}

	public async getRankedByName({
		name,
	}: GetDataByNameDTO): Promise<APIRes<PlayerRanked>> {
		try {
			const brawlhalla_id = await getBHIDFromName(name);

			return this.getRankedByID({ brawlhalla_id });
		} catch (error) {
			Logger.error(error, "RankedService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get ranked data for Brawlhalla name ${name}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get ranked data for Brawlhalla name ${name}`,
				);
		}
	}

	public async getRankedBySteamID({
		steam_id,
	}: GetDataBySteamIDDTO): Promise<APIRes<PlayerRanked>> {
		try {
			const { data: rankedData } = await getRankedBySteamID(steam_id);

			return {
				statusCode: HttpStatus.OK,
				message: `${rankedData.name} from API`,
				data: rankedData,
			};
		} catch (error) {
			Logger.error(error, "RankedService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get ranked data for Steam ID ${steam_id}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get ranked data for Steam ID ${steam_id}`,
				);
		}
	}

	public async getRankedBySteamURL({
		steam_url,
	}: GetDataBySteamURLDTO): Promise<APIRes<PlayerRanked>> {
		try {
			const { data: rankedData } = await getRankedBySteamURL(steam_url);

			return {
				statusCode: HttpStatus.OK,
				message: `${rankedData.name} from API`,
				data: rankedData,
			};
		} catch (error) {
			Logger.error(error, "RankedService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get ranked data for Steam URL ${steam_url}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get ranked data for Steam URL ${steam_url}`,
				);
		}
	}
}

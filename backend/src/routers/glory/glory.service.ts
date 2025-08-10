import {
	BHAPIError,
	getBHIDFromName,
	getGloryByBHID,
	getGloryFromSteamID,
	getGloryFromSteamURL,
	GloryData,
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
export class GloryService {
	public returnPing(): APIRes<null> {
		return {
			statusCode: HttpStatus.OK,
			message: "Pong!",
			data: null,
		};
	}

	public async getGloryByID({
		brawlhalla_id,
	}: GetDataByBHIDDTO): Promise<APIRes<GloryData>> {
		try {
			const gloryData = await getGloryByBHID(brawlhalla_id);

			return {
				statusCode: HttpStatus.OK,
				message: `${gloryData.name} from API`,
				data: gloryData,
			};
		} catch (error) {
			Logger.error(error, "GloryService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get glory data for Brawlhalla ID ${brawlhalla_id}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get glory data for Brawlhalla ID ${brawlhalla_id}`,
				);
		}
	}

	public async getGloryByName({
		name,
	}: GetDataByNameDTO): Promise<APIRes<GloryData>> {
		try {
			const brawlhalla_id = await getBHIDFromName(name);

			return this.getGloryByID({ brawlhalla_id });
		} catch (error) {
			Logger.error(error, "GloryService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get glory data for Brawlhalla name ${name}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get glory data for Brawlhalla name ${name}`,
				);
		}
	}

	public async getGloryBySteamID({
		steam_id,
	}: GetDataBySteamIDDTO): Promise<APIRes<GloryData>> {
		try {
			const gloryData = await getGloryFromSteamID(steam_id);

			return {
				statusCode: HttpStatus.OK,
				message: `${gloryData.name} from API`,
				data: gloryData,
			};
		} catch (error) {
			Logger.error(error, "GloryService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get glory data for Steam ID ${steam_id}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get glory data for Steam ID ${steam_id}`,
				);
		}
	}

	public async getGloryBySteamURL({
		steam_url,
	}: GetDataBySteamURLDTO): Promise<APIRes<GloryData>> {
		try {
			const gloryData = await getGloryFromSteamURL(steam_url);

			return {
				statusCode: HttpStatus.OK,
				message: `${gloryData.name} from API`,
				data: gloryData,
			};
		} catch (error) {
			Logger.error(error, "GloryService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get glory data for Steam URL ${steam_url}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get glory data for Steam URL ${steam_url}`,
				);
		}
	}
}

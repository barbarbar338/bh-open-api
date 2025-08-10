import {
	BHAPIError,
	BHIDFromSteamID,
	getBHIDFromSteamID,
	getSteamDataBySteamID,
	getSteamDataByURL,
	SteamData,
} from "@barbarbar338/bhapi";
import {
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import { APIRes } from "api-types";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";

@Injectable()
export class SteamDataService {
	public returnPing(): APIRes<null> {
		return {
			statusCode: HttpStatus.OK,
			message: "Pong!",
			data: null,
		};
	}

	public async getSteamDataByID({
		steam_id,
	}: GetDataBySteamIDDTO): Promise<APIRes<SteamData & BHIDFromSteamID>> {
		try {
			const steamData = await getSteamDataBySteamID(steam_id);
			const brawlhalla_id = await getBHIDFromSteamID(steam_id);

			return {
				statusCode: HttpStatus.OK,
				message: `${steamData.name} from API`,
				data: { ...steamData, brawlhalla_id },
			};
		} catch (error) {
			Logger.error(error, "SteamDataService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get Steam data for Steam ID ${steam_id}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get Steam data for Steam ID ${steam_id}`,
				);
		}
	}

	public async getSteamDataByURL({
		steam_url,
	}: GetDataBySteamURLDTO): Promise<APIRes<SteamData & BHIDFromSteamID>> {
		try {
			const steamData = await getSteamDataByURL(steam_url);
			const brawlhalla_id = await getBHIDFromSteamID(steamData.steam_id);

			return {
				statusCode: HttpStatus.OK,
				message: `${steamData.name} from API`,
				data: { ...steamData, brawlhalla_id },
			};
		} catch (error) {
			Logger.error(error, "SteamDataService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get Steam data for Steam URL ${steam_url}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get Steam data for Steam URL ${steam_url}`,
				);
		}
	}
}

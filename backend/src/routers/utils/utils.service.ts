import {
	BHAPIError,
	Clan,
	getClanByID,
	getRankings,
	Ranking1v1,
	Ranking2v2,
	RankingSeasonal,
} from "@barbarbar338/bhapi";
import {
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import { APIRes } from "api-types";
import { GetDataByClanIDDTO } from "src/dto/getDataByClanID.dto";
import { GetDataByRankingOptionsDTO } from "src/dto/getDataByRankingOptions.dto";

@Injectable()
export class UtilsService {
	public returnPing(): APIRes<null> {
		return {
			statusCode: HttpStatus.OK,
			message: "Pong!",
			data: null,
		};
	}

	public async getRankedDataByRankingOptions(
		options: GetDataByRankingOptionsDTO,
	): Promise<APIRes<Ranking1v1[] | Ranking2v2[] | RankingSeasonal[]>> {
		try {
			const { data: rankingsData } = await getRankings(options);

			return {
				statusCode: HttpStatus.OK,
				message: `${options.region}/${options.type}/${options.page} from API`,
				data: rankingsData,
			};
		} catch (error) {
			Logger.error(error, "UtilsService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get rankings for ${options.region}/${options.type}/${options.page}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get rankings for ${options.region}/${options.type}/${options.page}`,
				);
		}
	}

	public async getDataByClanID({
		clan_id,
	}: GetDataByClanIDDTO): Promise<APIRes<Clan>> {
		try {
			const { data: clanData } = await getClanByID(clan_id);

			return {
				statusCode: HttpStatus.OK,
				message: `${clanData.clan_name} from API`,
				data: clanData,
			};
		} catch (error) {
			Logger.error(error, "UtilsService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get clan data for ${clan_id}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get clan data for ${clan_id}`,
				);
		}
	}
}

import {
	BHAPIError,
	getAllLegends,
	getLegendByID,
	getLegendByName,
	StaticAllLegends,
	StaticLegend,
	thumbnails,
} from "@barbarbar338/bhapi";
import {
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import { APIRes } from "api-types";
import { GetLegendByIDDTO } from "src/dto/getLegendByID.dto";
import { GetLegendByNameDTO } from "src/dto/getLegendByName.dto";

@Injectable()
export class LegendsService {
	public returnPing(): APIRes<null> {
		return {
			statusCode: HttpStatus.OK,
			message: "Pong!",
			data: null,
		};
	}

	public async getLegendByID({
		legend_id,
	}: GetLegendByIDDTO): Promise<
		APIRes<StaticLegend & { thumbnail: string }>
	> {
		try {
			const { data: legendData } = await getLegendByID(legend_id);

			return {
				statusCode: HttpStatus.OK,
				message: `${legendData.bio_name} from API`,
				data: {
					...legendData,
					thumbnail:
						thumbnails[
							legendData.legend_name_key as keyof typeof thumbnails
						],
				},
			};
		} catch (error) {
			Logger.error(error, "LegendsService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get legend data for legend ID ${legend_id}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get legend data for legend ID ${legend_id}`,
				);
		}
	}

	public async getLegendByName({
		legend_name,
	}: GetLegendByNameDTO): Promise<
		APIRes<StaticLegend & { thumbnail: string }>
	> {
		try {
			const { data: legendData } = await getLegendByName(legend_name);

			return {
				statusCode: HttpStatus.OK,
				message: `${legendData.bio_name} from API`,
				data: {
					...legendData,
					thumbnail:
						thumbnails[
							legendData.legend_name_key as keyof typeof thumbnails
						],
				},
			};
		} catch (error) {
			Logger.error(error, "LegendsService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get legend data for legend name ${legend_name}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get legend data for legend name ${legend_name}`,
				);
		}
	}

	public async getAllLegends(): Promise<
		APIRes<(StaticAllLegends & { thumbnail: string })[]>
	> {
		try {
			const { data: legendsData } = await getAllLegends();

			return {
				statusCode: HttpStatus.OK,
				message: "All legends from API",
				data: legendsData.map((legend) => ({
					...legend,
					thumbnail:
						thumbnails[
							legend.legend_name_key as keyof typeof thumbnails
						],
				})),
			};
		} catch (error) {
			Logger.error(error, "LegendsService");

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to get all legends data: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to get all legends data`,
				);
		}
	}
}

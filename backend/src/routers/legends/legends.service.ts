import {
	BHAPIError,
	getLegendByID,
	getLegendByName,
	thumbnails,
} from "@barbarbar338/bhapi";
import {
	HttpStatus,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIRes } from "api-types";
import { GetLegendByIDDTO } from "src/dto/getLegendByID.dto";
import { GetLegendByNameDTO } from "src/dto/getLegendByName.dto";
import { MongoRepository } from "typeorm";
import { LegendsEntity } from "./legends.entity";

@Injectable()
export class LegendsService {
	constructor(
		@InjectRepository(LegendsEntity)
		private readonly legendsRepository: MongoRepository<LegendsEntity>,
	) {}

	public returnPing(): APIRes<null> {
		return {
			statusCode: HttpStatus.OK,
			message: "Pong!",
			data: null,
		};
	}

	private async getLegendData(legend_id: number): Promise<LegendsEntity> {
		const legendData = await this.legendsRepository.findOne({
			where: {
				legend_id,
			},
		});

		return legendData;
	}

	private async isExists(legend_id: number): Promise<boolean> {
		const legendData = await this.legendsRepository.findOne({
			where: {
				legend_id,
			},
		});

		return !!legendData;
	}

	public async syncLegend({
		legend_id,
	}: GetLegendByIDDTO): Promise<
		APIRes<LegendsEntity & { thumbnail: string }>
	> {
		try {
			const legendData = new LegendsEntity({
				...(await getLegendByID(legend_id)).data,
			});

			const isExists = await this.isExists(legend_id);
			if (isExists) {
				await this.legendsRepository.updateOne(
					{ legend_id },
					{ $set: legendData },
				);
			} else {
				const repository = this.legendsRepository.create(legendData);
				await this.legendsRepository.save(repository);
			}

			return {
				statusCode: HttpStatus.OK,
				message: `${legendData.bio_name} synced`,
				data: {
					...legendData,
					thumbnail:
						thumbnails[
							legendData.legend_name_key as keyof typeof thumbnails
						],
				},
			};
		} catch (error) {
			console.error(error);

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to sync legend for Brawlhalla ID ${legend_id}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to sync legend for Brawlhalla ID ${legend_id}`,
				);
		}
	}

	public async getLegendByID({
		legend_id,
	}: GetLegendByIDDTO): Promise<
		APIRes<LegendsEntity & { thumbnail: string }>
	> {
		const legendData = await this.getLegendData(legend_id);

		if (!legendData) return this.syncLegend({ legend_id });
		else {
			delete legendData._id;
			return {
				statusCode: HttpStatus.OK,
				message: `${legendData.bio_name} from database`,
				data: {
					...legendData,
					thumbnail:
						thumbnails[
							legendData.legend_name_key as keyof typeof thumbnails
						],
				},
			};
		}
	}
	public async getLegendByName({
		legend_name,
	}: GetLegendByNameDTO): Promise<
		APIRes<LegendsEntity & { thumbnail: string }>
	> {
		const legendData = await this.legendsRepository.findOne({
			where: {
				legend_name_key: legend_name,
			},
		});

		if (legendData) {
			delete legendData._id;

			return {
				statusCode: HttpStatus.OK,
				message: `${legendData.bio_name} from database`,
				data: {
					...legendData,
					thumbnail:
						thumbnails[
							legendData.legend_name_key as keyof typeof thumbnails
						],
				},
			};
		} else {
			try {
				const newData = new LegendsEntity({
					...(await getLegendByName(legend_name)).data,
				});

				const repository = this.legendsRepository.create(newData);
				await this.legendsRepository.save(repository);

				return {
					statusCode: HttpStatus.OK,
					message: `${newData.bio_name} sync`,
					data: {
						...newData,
						thumbnail:
							thumbnails[
								newData.legend_name_key as keyof typeof thumbnails
							],
					},
				};
			} catch (error) {
				console.error(error);

				if (error instanceof BHAPIError) {
					if (error.status == 429)
						throw new InternalServerErrorException(
							`Rate limit exceeded. Please try again later.`,
						);
					else
						throw new InternalServerErrorException(
							`Failed to sync legend for name ${legend_name}: ${error.message}`,
						);
				} else
					throw new InternalServerErrorException(
						`Failed to sync legend for name ${legend_name}`,
					);
			}
		}
	}

	public async getAllLegends(): Promise<
		APIRes<(LegendsEntity & { thumbnail: string })[]>
	> {
		const allLegends = (await this.legendsRepository.find()).map(
			(legendData) => {
				delete legendData._id;
				return legendData;
			},
		);

		return {
			statusCode: HttpStatus.OK,
			message: "All legends from database",
			data: allLegends.map((l) => ({
				...l,
				thumbnail:
					thumbnails[l.legend_name_key as keyof typeof thumbnails],
			})),
		};
	}
}

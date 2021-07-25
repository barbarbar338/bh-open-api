import { Injectable, HttpStatus } from "@nestjs/common";
import { APIRes } from "api-types";
import { MongoRepository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LegendsEntity } from "./legends.entity";
import { BHAPIService } from "src/libs/BHAPI";
import { GetLegendByIDDTO } from "src/dto/getLegendByID.dto";
import { GetLegendByNameDTO } from "src/dto/getLegendByName.dto";

@Injectable()
export class LegendsService {
	constructor(
		@InjectRepository(LegendsEntity)
		private readonly legendsRepository: MongoRepository<LegendsEntity>,
		private readonly bhAPIService: BHAPIService,
	) {}

	public returnPing(): APIRes<null> {
		return {
			statusCode: HttpStatus.OK,
			message: "Pong!",
			data: null,
		};
	}

	private async isExists(id: number): Promise<boolean> {
		const legendData = await this.legendsRepository.findOne({
			legend_id: id,
		});

		return !!legendData;
	}

	private async getLegendData(legend_id: number): Promise<LegendsEntity> {
		const legendData = await this.legendsRepository.findOne({ legend_id });

		return legendData;
	}

	public async syncLegend({
		legend_id,
	}: GetLegendByIDDTO): Promise<APIRes<LegendsEntity>> {
		const legendData = new LegendsEntity({
			...(await this.bhAPIService.getLegendByID(legend_id)),
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
			data: legendData,
		};
	}

	public async getLegendByID({
		legend_id,
	}: GetLegendByIDDTO): Promise<APIRes<LegendsEntity>> {
		const legendData = await this.getLegendData(legend_id);

		if (!legendData) return this.syncLegend({ legend_id });
		else {
			delete legendData._id;
			return {
				statusCode: HttpStatus.OK,
				message: `${legendData.bio_name} from database`,
				data: legendData,
			};
		}
	}
	public async getLegendByName({
		legend_name,
	}: GetLegendByNameDTO): Promise<APIRes<LegendsEntity>> {
		const legendData = await this.legendsRepository.findOne({
			legend_name_key: legend_name,
		});

		if (legendData) {
			delete legendData._id;

			return {
				statusCode: HttpStatus.OK,
				message: `${legendData.bio_name} from database`,
				data: legendData,
			};
		} else {
			const newData = new LegendsEntity({
				...(await this.bhAPIService.getLegendByName(legend_name)),
			});

			const repository = this.legendsRepository.create(newData);
			await this.legendsRepository.save(repository);

			return {
				statusCode: HttpStatus.OK,
				message: `${newData.bio_name} sync`,
				data: newData,
			};
		}
	}

	public async getAllLegends(): Promise<APIRes<LegendsEntity[]>> {
		const allLegends = (await this.legendsRepository.find()).map(
			legendData => {
				delete legendData._id;
				return legendData;
			},
		);

		return {
			statusCode: HttpStatus.OK,
			message: "All legends from database",
			data: allLegends,
		};
	}
}

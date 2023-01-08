import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIRes } from "api-types";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";
import { BHAPIService } from "src/libs/BHAPI";
import { MongoRepository } from "typeorm";
import { SteamDataEntity } from "./steamdata.entity";

@Injectable()
export class SteamDataService {
	constructor(
		@InjectRepository(SteamDataEntity)
		private readonly steamdataRepository: MongoRepository<SteamDataEntity>,
		private readonly bhAPIService: BHAPIService,
	) {}

	public returnPing(): APIRes<null> {
		return {
			statusCode: HttpStatus.OK,
			message: "Pong!",
			data: null,
		};
	}

	private async isSteamDataExists(steam_id: string): Promise<boolean> {
		const statsData = await this.steamdataRepository.findOne({
			where: {
				steam_id,
			},
		});

		return !!statsData;
	}

	private async getSteamData(steam_id: string): Promise<SteamDataEntity> {
		const statsData = await this.steamdataRepository.findOne({
			where: {
				steam_id,
			},
		});

		return statsData;
	}

	public async syncSteamData({
		steam_id,
	}: GetDataBySteamIDDTO): Promise<APIRes<SteamDataEntity>> {
		const statsData = await this.bhAPIService.getSteamDataByID(steam_id);
		const isExists = await this.isSteamDataExists(steam_id);
		const bhData = await this.bhAPIService.getBHIDFromSteamID(
			statsData.steam_id,
		);
		const data = new SteamDataEntity({
			steam_id: statsData.steam_id,
			steam_url: statsData.steam_url,
			brawlhalla_id: bhData.brawlhalla_id,
		});

		if (isExists) {
			await this.steamdataRepository.updateOne(
				{ steam_id },
				{ $set: data },
			);
		} else {
			const repository = this.steamdataRepository.create(data);
			await this.steamdataRepository.save(repository);
		}

		return {
			statusCode: HttpStatus.OK,
			message: `${data.steam_url} synced`,
			data: data,
		};
	}

	public async getSteamDataByID({
		steam_id,
	}: GetDataBySteamIDDTO): Promise<APIRes<SteamDataEntity>> {
		const steamData = await this.getSteamData(steam_id);

		if (!steamData) return this.syncSteamData({ steam_id });
		else {
			delete steamData._id;

			return {
				statusCode: HttpStatus.OK,
				message: `${steamData.steam_url} from database`,
				data: steamData,
			};
		}
	}

	public async getSteamDataByURL({
		steam_url,
	}: GetDataBySteamURLDTO): Promise<APIRes<SteamDataEntity>> {
		const { steam_id } = await this.bhAPIService.getSteamDataByURL(
			steam_url,
		);

		return this.getSteamDataByID({ steam_id });
	}
}

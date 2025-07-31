import {
	BHAPIError,
	getBHIDFromSteamID,
	getSteamDataBySteamID,
	getSteamDataByURL,
} from "@barbarbar338/bhapi";
import {
	HttpStatus,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIRes } from "api-types";
import { GetDataBySteamIDDTO } from "src/dto/getDataBySteamID.dto";
import { GetDataBySteamURLDTO } from "src/dto/getDataBySteamURL.dto";
import { MongoRepository } from "typeorm";
import { SteamDataEntity } from "./steamdata.entity";

@Injectable()
export class SteamDataService {
	constructor(
		@InjectRepository(SteamDataEntity)
		private readonly steamdataRepository: MongoRepository<SteamDataEntity>,
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
		try {
			const steamData = await getSteamDataBySteamID(steam_id);
			const isExists = await this.isSteamDataExists(steam_id);
			const bhID = await getBHIDFromSteamID(steamData.steam_id);

			const data = new SteamDataEntity({
				steam_id: steamData.steam_id,
				steam_url: steamData.steam_url,
				brawlhalla_id: bhID,
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
		} catch (error) {
			console.error(error);

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to sync steam data for Steam ID ${steam_id}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to sync steam data for Steam ID ${steam_id}`,
				);
		}
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
		try {
			const { steam_id } = await getSteamDataByURL(steam_url);

			return this.getSteamDataByID({ steam_id });
		} catch (error) {
			console.error(error);

			if (error instanceof BHAPIError) {
				if (error.status == 429)
					throw new InternalServerErrorException(
						`Rate limit exceeded. Please try again later.`,
					);
				else
					throw new InternalServerErrorException(
						`Failed to sync steam data for Steam URL ${steam_url}: ${error.message}`,
					);
			} else
				throw new InternalServerErrorException(
					`Failed to sync steam data for Steam URL ${steam_url}`,
				);
		}
	}
}

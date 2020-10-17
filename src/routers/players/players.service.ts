import { Injectable, HttpStatus } from "@nestjs/common";
import { APIRes } from "api-types";
import { BHAPIService } from "src/libs/BHAPI";
import { MongoRepository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StatsEntity } from "./stats.entity";
import { SyncDataDTO } from "./dto/syncData.dto";

@Injectable()
export class PlayersService {
    constructor(
        @InjectRepository(StatsEntity)
        private readonly statsRepository: MongoRepository<StatsEntity>,
        private readonly bhAPIService: BHAPIService,
    ) {}
    public returnPing(): APIRes {
        return {
            statusCode: HttpStatus.OK,
            message: "Pong!",
            data: null,
        };
    }
    private async isStatsExists(brawlhalla_id: number): Promise<boolean> {
        const statsData = await this.statsRepository.findOne({
            brawlhalla_id,
        });
        return !!statsData;
    }
    public async syncStats({ brawlhalla_id }: SyncDataDTO): Promise<APIRes> {
        const statsData = await this.bhAPIService.getStatsByBHID(brawlhalla_id);
        const isExists = await this.isStatsExists(brawlhalla_id);
        const data = { ...statsData, lastSynced: Date.now() }
        if (isExists) {
            await this.statsRepository.updateOne(
                { brawlhalla_id },
                { $set: data },
            );
        } else {
            const repository = this.statsRepository.create(data);
            await this.statsRepository.save(repository);
        }
        return {
            statusCode: HttpStatus.OK,
            message: `${data.name} synced`,
            data: data,
        };
    }
}

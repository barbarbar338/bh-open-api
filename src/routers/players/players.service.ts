import { Injectable, HttpStatus } from "@nestjs/common";
import { APIRes } from "api-types";
import { BHAPIService } from "src/libs/BHAPI";
import { MongoRepository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StatsEntity } from "./stats.entity";
import { RankedEntity } from "./ranked.entity";
import { GloryEntity } from "./glory.entity";
import { SyncDataDTO } from "./dto/syncData.dto";

@Injectable()
export class PlayersService {
    constructor(
        @InjectRepository(StatsEntity)
        private readonly statsRepository: MongoRepository<StatsEntity>,
        @InjectRepository(RankedEntity)
        private readonly rankedRepository: MongoRepository<RankedEntity>,
        @InjectRepository(GloryEntity)
        private readonly gloryRepository: MongoRepository<GloryEntity>,
        private readonly bhAPIService: BHAPIService,
    ) {}

    //#region helpers
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
    private async getStatsData(brawlhalla_id: number): Promise<StatsEntity> {
        const statsData = await this.statsRepository.findOne({ brawlhalla_id });
        return statsData;
    }
    private async isRankedExists(brawlhalla_id: number): Promise<boolean> {
        const rankedData = await this.rankedRepository.findOne({
            brawlhalla_id,
        });
        return !!rankedData;
    }
    private async getRankedData(brawlhalla_id: number): Promise<RankedEntity> {
        const rankedData = await this.rankedRepository.findOne({ brawlhalla_id });
        return rankedData;
    }
    private async isGloryExists(brawlhalla_id: number): Promise<boolean> {
        const gloryData = await this.gloryRepository.findOne({
            brawlhalla_id,
        });
        return !!gloryData;
    }
    private async getGloryData(brawlhalla_id: number): Promise<GloryEntity> {
        const gloryData = await this.gloryRepository.findOne({ brawlhalla_id });
        return gloryData;
    }
    //#endregion

    //#region stats
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
    public async getBHStatsByBHID({ brawlhalla_id }: SyncDataDTO): Promise<APIRes> {
        const statsData = await this.getStatsData(brawlhalla_id);
        if (!statsData) {
            return this.syncStats({ brawlhalla_id });
        } else {
            if (Date.now() - statsData.lastSynced > 1000 * 60 * 5) return this.syncStats({ brawlhalla_id });
            else {
                delete statsData._id;
                return {
                    statusCode: HttpStatus.OK,
                    message: `${statsData.name} from database`,
                    data: statsData,
                };
            }
        }
    }
    //#endregion

    //#region ranked
    public async syncRanked({ brawlhalla_id }: SyncDataDTO): Promise<APIRes> {
        const rankedData = await this.bhAPIService.getRankedByBHID(brawlhalla_id);
        const isExists = await this.isRankedExists(brawlhalla_id);
        const data = { ...rankedData, lastSynced: Date.now() }
        if (isExists) {
            await this.rankedRepository.updateOne(
                { brawlhalla_id },
                { $set: data },
            );
        } else {
            const repository = this.rankedRepository.create(data);
            await this.rankedRepository.save(repository);
        }
        return {
            statusCode: HttpStatus.OK,
            message: `${data.name} synced`,
            data: data,
        };
    }
    public async getBHRankedByBHID({ brawlhalla_id }: SyncDataDTO): Promise<APIRes> {
        const rankedData = await this.getRankedData(brawlhalla_id);
        if (!rankedData) {
            return this.syncRanked({ brawlhalla_id });
        } else {
            if (Date.now() - rankedData.lastSynced > 1000 * 60 * 5) return this.syncRanked({ brawlhalla_id });
            else {
                delete rankedData._id;
                return {
                    statusCode: HttpStatus.OK,
                    message: `${rankedData.name} from database`,
                    data: rankedData,
                };
            }
        }
    }
    //#endregion

    //#region glory
    public async syncGlory({ brawlhalla_id }: SyncDataDTO): Promise<APIRes> {
        const gloryData = await this.bhAPIService.getGloryByBHID(brawlhalla_id);
        const isExists = await this.isGloryExists(brawlhalla_id);
        const data = { ...gloryData, lastSynced: Date.now() }
        if (isExists) {
            await this.gloryRepository.updateOne(
                { brawlhalla_id },
                { $set: data },
            );
        } else {
            const repository = this.gloryRepository.create(data);
            await this.gloryRepository.save(repository);
        }
        return {
            statusCode: HttpStatus.OK,
            message: `${data.name} synced`,
            data: data,
        };
    }
    public async getBHGloryByBHID({ brawlhalla_id }: SyncDataDTO): Promise<APIRes> {
        const gloryData = await this.getGloryData(brawlhalla_id);
        if (!gloryData) {
            return this.syncGlory({ brawlhalla_id });
        } else {
            if (Date.now() - gloryData.lastSynced > 1000 * 60 * 5) return this.syncGlory({ brawlhalla_id });
            else {
                delete gloryData._id;
                return {
                    statusCode: HttpStatus.OK,
                    message: `${gloryData.name} from database`,
                    data: gloryData,
                };
            }
        }
    }
    //#endregion
}

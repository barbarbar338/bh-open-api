import { Injectable, HttpStatus } from "@nestjs/common";
import { APIRes } from "api-types";
import { BHAPIService } from "src/libs/BHAPI";
import { MongoRepository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RankedEntity } from "./ranked.entity";
import { GetDataByBHIDDTO } from "src/dto/getDataByBHID.dto";

@Injectable()
export class RankedService {
    constructor(
        @InjectRepository(RankedEntity)
        private readonly rankedRepository: MongoRepository<RankedEntity>,
        private readonly bhAPIService: BHAPIService,
    ) {}
    public returnPing(): APIRes {
        return {
            statusCode: HttpStatus.OK,
            message: "Pong!",
            data: null,
        };
    }
    private async isRankedExists(brawlhalla_id: number): Promise<boolean> {
        const rankedData = await this.rankedRepository.findOne({
            brawlhalla_id,
        });
        return !!rankedData;
    }
    private async getRankedData(brawlhalla_id: number): Promise<RankedEntity> {
        const rankedData = await this.rankedRepository.findOne({
            brawlhalla_id,
        });
        return rankedData;
    }
    public async syncRanked({
        brawlhalla_id,
    }: GetDataByBHIDDTO): Promise<APIRes> {
        const rankedData = await this.bhAPIService.getRankedByBHID(
            brawlhalla_id,
        );
        const isExists = await this.isRankedExists(brawlhalla_id);
        const data = { ...rankedData, lastSynced: Date.now() };
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
    public async getRankedByBHID({
        brawlhalla_id,
    }: GetDataByBHIDDTO): Promise<APIRes> {
        const rankedData = await this.getRankedData(brawlhalla_id);
        if (!rankedData) {
            return this.syncRanked({ brawlhalla_id });
        } else {
            if (Date.now() - rankedData.lastSynced > 1000 * 60 * 10)
                return this.syncRanked({ brawlhalla_id });
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
}

import { Injectable, HttpStatus } from "@nestjs/common";
import { APIRes } from "api-types";
import { BHAPIService } from "src/libs/BHAPI";
import { MongoRepository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { GloryEntity } from "./glory.entity";
import { GetDataByBHIDDTO } from "./dto/getDataByBHID.dto";

@Injectable()
export class GloryService {
    constructor(
        @InjectRepository(GloryEntity)
        private readonly gloryRepository: MongoRepository<GloryEntity>,
        private readonly bhAPIService: BHAPIService,
    ) {}
    public returnPing(): APIRes {
        return {
            statusCode: HttpStatus.OK,
            message: "Pong!",
            data: null,
        };
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
    public async syncGlory({ brawlhalla_id }: GetDataByBHIDDTO): Promise<APIRes> {
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
    public async getGloryByBHID({ brawlhalla_id }: GetDataByBHIDDTO): Promise<APIRes> {
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
}

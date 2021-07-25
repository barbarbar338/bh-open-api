import { RankedRegion } from "api-types";
import { IsDefined } from "class-validator";

export class GetDataByRankingOptionsDTO {
	@IsDefined()
	region: RankedRegion;

	@IsDefined()
	page: string | number;
}

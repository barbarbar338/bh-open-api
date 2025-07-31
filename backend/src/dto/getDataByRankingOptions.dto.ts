import { RankedRegion } from "@barbarbar338/bhapi";
import { IsDefined } from "class-validator";

export class GetDataByRankingOptionsDTO {
	@IsDefined()
	region: RankedRegion;

	@IsDefined()
	page: string | number;
}

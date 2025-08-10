import { RankedRegion } from "@barbarbar338/bhapi";
import { IsDefined, IsEnum } from "class-validator";

export class GetDataByRankingOptionsDTO {
	@IsDefined()
	region: RankedRegion;

	@IsDefined()
	page: string | number;

	@IsDefined()
	@IsEnum(["1v1", "2v2", "seasonal"])
	type: "1v1" | "2v2" | "seasonal";
}

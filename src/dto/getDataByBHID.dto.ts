import { Transform } from "class-transformer";
import { IsDefined, IsNumber } from "class-validator";

export class GetDataByBHIDDTO {
	@IsDefined()
	@Transform(i => parseInt(i))
	@IsNumber()
	brawlhalla_id: number;
}

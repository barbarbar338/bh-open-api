import { Transform } from "class-transformer";
import { IsDefined, IsNumber, Max, Min, NotEquals } from "class-validator";

export class GetLegendByIDDTO {
	@IsDefined()
	@Transform((i) => parseInt(i.value))
	@IsNumber()
	@Min(3)
	@Max(66)
	@NotEquals(61)
	legend_id: number;
}

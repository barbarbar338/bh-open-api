import { Transform } from "class-transformer";
import { IsDefined, IsNumber, Max, Min, NotEquals } from "class-validator";

export class GetLegendByIDDTO {
	@IsDefined()
	@Transform((i) => parseInt(i.value as string))
	@IsNumber()
	@Min(3)
	@Max(68)
	@NotEquals(61)
	legend_id: number;
}

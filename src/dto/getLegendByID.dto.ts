import { Transform } from "class-transformer";
import { IsDefined, IsNumber, Max, Min, NotEquals } from "class-validator";

export class GetLegendByIDDTO {
	@IsDefined()
	@Transform((i) => parseInt(i.value))
	@IsNumber()
	@Min(3)
	@Max(63)
	@NotEquals(17)
	@NotEquals(27)
	@NotEquals(61)
	@NotEquals(62)
	legend_id: number;
}

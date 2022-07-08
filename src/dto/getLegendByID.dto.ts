import { Transform } from "class-transformer";
import { IsDefined, IsNumber, Min, Max, NotEquals } from "class-validator";

export class GetLegendByIDDTO {
	@IsDefined()
	@Transform((i) => parseInt(i.value))
	@IsNumber()
	@Min(3)
	@Max(59)
	@NotEquals(17)
	@NotEquals(27)
	legend_id: number;
}

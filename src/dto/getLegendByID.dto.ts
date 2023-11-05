import { Transform } from "class-transformer";
import { IsDefined, IsNumber, Max, Min, NotEquals } from "class-validator";

export class GetLegendByIDDTO {
	// @NotEquals(27) new legend loki uses legend id 27
	// @NotEquals(17) new legend red raptor uses legend id 17
	// @NotEquals(62) new legend thea uses legend id 62
	@IsDefined()
	@Transform((i) => parseInt(i.value))
	@IsNumber()
	@Min(3)
	@Max(63)
	@NotEquals(61)
	legend_id: number;
}

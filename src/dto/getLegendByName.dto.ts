import { IsDefined } from "class-validator";

export class GetLegendByNameDTO {
	@IsDefined()
	legend_name: string;
}

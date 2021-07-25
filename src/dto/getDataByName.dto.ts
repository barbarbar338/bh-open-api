import { IsDefined } from "class-validator";

export class GetDataByNameDTO {
	@IsDefined()
	name: string;
}

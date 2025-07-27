import { Transform } from "class-transformer";
import { IsDefined, IsNumber } from "class-validator";

export class GetDataByClanIDDTO {
	@IsDefined()
	@Transform((i) => parseInt(i.value as string))
	@IsNumber()
	clan_id: number;
}

import { IsDefined, IsNumberString } from "class-validator";

export class GetDataBySteamIDDTO {
	@IsDefined()
	@IsNumberString()
	steam_id: string;
}

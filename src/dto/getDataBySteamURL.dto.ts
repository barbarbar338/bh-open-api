import { IsDefined, IsUrl, Matches } from "class-validator";

export class GetDataBySteamURLDTO {
	@IsDefined()
	@IsUrl()
	@Matches(/(steamcommunity\.com\/(id|profiles)\/([^\s]+))/i)
	steam_url: string;
}

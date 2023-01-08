import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity({ name: "SteamDataEntity" })
export class SteamDataEntity {
	@ObjectIdColumn()
	_id: ObjectID;

	@Column({ nullable: false, unique: true })
	brawlhalla_id: number;

	@Column({ nullable: false, unique: true })
	steam_url: string;

	@Column({ nullable: false, unique: true })
	steam_id: string;

	constructor(partial: Partial<SteamDataEntity>) {
		Object.assign(this, partial);
	}
}

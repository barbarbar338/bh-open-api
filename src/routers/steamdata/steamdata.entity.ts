import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity({ name: "SteamDataEntity" })
export class SteamDataEntity {
	@ObjectIdColumn()
	_id: ObjectId;

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

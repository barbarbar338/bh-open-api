import { IClanMember } from "api-types";
import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

@Entity({ name: "ClanEntity" })
export class ClanEntity {
	@ObjectIdColumn()
	_id: ObjectID;

	@Column({ nullable: false, unique: true })
	clan_id: number;

	@Column({ nullable: false })
	clan_name: string;

	@Column({ nullable: false })
	clan_create_date: number;

	@Column({ nullable: false })
	clan_xp: string;

	@Column({ nullable: false })
	clan: IClanMember[];

	@Column({ nullable: false })
	lastSynced: number;

	constructor(partial: Partial<ClanEntity>) {
		Object.assign(this, partial);
	}
}

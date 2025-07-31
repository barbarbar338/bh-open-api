import { ClanMember } from "@barbarbar338/bhapi";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity({ name: "ClanEntity" })
export class ClanEntity {
	@ObjectIdColumn()
	_id: ObjectId;

	@Column({ nullable: false, unique: true })
	clan_id: number;

	@Column({ nullable: false })
	clan_name: string;

	@Column({ nullable: false })
	clan_create_date: number;

	@Column({ nullable: false })
	clan_xp: string;

	@Column({ nullable: false })
	clan: ClanMember[];

	@Column({ nullable: false })
	lastSynced: number;

	constructor(partial: Partial<ClanEntity>) {
		Object.assign(this, partial);
	}
}

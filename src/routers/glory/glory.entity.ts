import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

@Entity({ name: "GloryEntity" })
export class GloryEntity {
	@ObjectIdColumn()
	_id: ObjectID;

	@Column({ nullable: false, unique: true })
	brawlhalla_id: number;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: false })
	bestElo: number;

	@Column({ nullable: false })
	eloReset: number;

	@Column({ nullable: false, type: "simple-json" })
	glory: {
		wins: number;
		rating: number;
	};

	@Column({ nullable: false })
	lastSynced: number;

	constructor(partial: Partial<GloryEntity>) {
		Object.assign(this, partial);
	}
}

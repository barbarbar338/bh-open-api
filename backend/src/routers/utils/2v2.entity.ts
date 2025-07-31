import { RankedRegion, Ranking2v2 } from "@barbarbar338/bhapi";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity({ name: "Ranked2v2Entity" })
export class Ranked2v2Entity {
	@ObjectIdColumn()
	_id: ObjectId;

	@Column({ nullable: false })
	page: number | string;

	@Column({ nullable: false })
	region: RankedRegion;

	@Column({ nullable: false })
	data: Ranking2v2[];

	@Column({ nullable: false })
	lastSynced: number;

	constructor(partial: Partial<Ranked2v2Entity>) {
		Object.assign(this, partial);
	}
}

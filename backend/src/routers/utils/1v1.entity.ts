import { RankedRegion, Ranking1v1 } from "@barbarbar338/bhapi";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity({ name: "Ranked1v1Entity" })
export class Ranked1v1Entity {
	@ObjectIdColumn()
	_id: ObjectId;

	@Column({ nullable: false })
	page: number | string;

	@Column({ nullable: false })
	region: RankedRegion;

	@Column({ nullable: false })
	data: Ranking1v1[];

	@Column({ nullable: false })
	lastSynced: number;

	constructor(partial: Partial<Ranked1v1Entity>) {
		Object.assign(this, partial);
	}
}

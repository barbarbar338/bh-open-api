import { IRanking1v1, RankedRegion } from "api-types";
import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity({ name: "Ranked1v1Entity" })
export class Ranked1v1Entity {
	@ObjectIdColumn()
	_id: ObjectID;

	@Column({ nullable: false })
	page: number | string;

	@Column({ nullable: false })
	region: RankedRegion;

	@Column({ nullable: false })
	data: IRanking1v1[];

	@Column({ nullable: false })
	lastSynced: number;

	constructor(partial: Partial<Ranked1v1Entity>) {
		Object.assign(this, partial);
	}
}

import { IRankingSeasonal, RankedRegion } from "api-types";
import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity({ name: "RankedSeasonalEntity" })
export class RankedSeasonalEntity {
	@ObjectIdColumn()
	_id: ObjectID;

	@Column({ nullable: false })
	page: number | string;

	@Column({ nullable: false })
	region: RankedRegion;

	@Column({ nullable: false })
	data: IRankingSeasonal[];

	@Column({ nullable: false })
	lastSynced: number;

	constructor(partial: Partial<RankedSeasonalEntity>) {
		Object.assign(this, partial);
	}
}

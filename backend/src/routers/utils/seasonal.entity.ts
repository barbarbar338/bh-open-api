import { RankedRegion, RankingSeasonal } from "@barbarbar338/bhapi";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity({ name: "RankedSeasonalEntity" })
export class RankedSeasonalEntity {
	@ObjectIdColumn()
	_id: ObjectId;

	@Column({ nullable: false })
	page: number | string;

	@Column({ nullable: false })
	region: RankedRegion;

	@Column({ nullable: false })
	data: RankingSeasonal[];

	@Column({ nullable: false })
	lastSynced: number;

	constructor(partial: Partial<RankedSeasonalEntity>) {
		Object.assign(this, partial);
	}
}

import { ILegendStats, IPlayerClan } from "api-types";
import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity({ name: "StatsEntity" })
export class StatsEntity {
	@ObjectIdColumn()
	_id: ObjectID;

	@Column({ nullable: false, unique: true })
	brawlhalla_id: number;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: false })
	xp: number;

	@Column({ nullable: false })
	level: number;

	@Column({ nullable: false })
	xp_percentage: number;

	@Column({ nullable: false })
	games: number;

	@Column({ nullable: false })
	wins: number;

	@Column({ nullable: false })
	damagebomb: string;

	@Column({ nullable: false })
	damagemine: string;

	@Column({ nullable: false })
	damagespikeball: string;

	@Column({ nullable: false })
	damagesidekick: string;

	@Column({ nullable: false })
	hitsnowball: number;

	@Column({ nullable: false })
	kobomb: number;

	@Column({ nullable: false })
	komine: number;

	@Column({ nullable: false })
	kospikeball: number;

	@Column({ nullable: false })
	kosidekick: number;

	@Column({ nullable: false })
	kosnowball: number;

	@Column({ nullable: false })
	legends: ILegendStats[];

	@Column({ nullable: false })
	clan: IPlayerClan | undefined;

	@Column({ nullable: false })
	lastSynced: number;

	constructor(partial: Partial<StatsEntity>) {
		Object.assign(this, partial);
	}
}

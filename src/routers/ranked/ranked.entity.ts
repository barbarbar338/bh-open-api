import { I2v2Team, ILegendRanked, RankedRegion, RankedTier } from "api-types";
import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

@Entity({ name: "RankedEntity" })
export class RankedEntity {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column({ nullable: false, unique: true })
    brawlhalla_id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    global_rank: number;

    @Column({ nullable: false })
    region_rank: number;

    @Column({ nullable: false })
    legends: ILegendRanked[];

    @Column({ nullable: false })
    "2v2": I2v2Team[];

    @Column({ nullable: false })
    rating: number;

    @Column({ nullable: false })
    peak_rating: number;

    @Column({ nullable: false })
    tier: RankedTier;

    @Column({ nullable: false })
    wins: number;

    @Column({ nullable: false })
    games: number;

    @Column({ nullable: false })
    region: RankedRegion;

    @Column({ nullable: false })
    lastSynced: number;

    constructor(partial: Partial<RankedEntity>) {
        Object.assign(this, partial);
    }
}

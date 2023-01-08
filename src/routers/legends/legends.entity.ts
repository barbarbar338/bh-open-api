import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity({ name: "LegendsEntity" })
export class LegendsEntity {
	@ObjectIdColumn()
	_id: ObjectID;

	@Column({ nullable: false, unique: true })
	legend_id: number;

	@Column({ nullable: false })
	legend_name_key: string;

	@Column({ nullable: false })
	bio_name: string;

	@Column({ nullable: false })
	bio_aka: string;

	@Column({ nullable: false })
	weapon_one: string;

	@Column({ nullable: false })
	weapon_two: string;

	@Column({ nullable: false })
	strength: string;

	@Column({ nullable: false })
	dexterity: string;

	@Column({ nullable: false })
	defense: string;

	@Column({ nullable: false })
	speed: string;

	@Column({ nullable: false })
	bio_quote: string;

	@Column({ nullable: false })
	bio_quote_about_attrib: string;

	@Column({ nullable: false })
	bio_quote_from: string;

	@Column({ nullable: false })
	bio_quote_from_attrib: string;

	@Column({ nullable: false })
	bio_text: string;

	@Column({ nullable: false })
	bot_name: string;

	constructor(partial: Partial<LegendsEntity>) {
		Object.assign(this, partial);
	}
}

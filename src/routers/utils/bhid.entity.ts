import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity({ name: "BHIDEntity" })
export class BHIDEntity {
	@ObjectIdColumn()
	_id: ObjectId;

	@Column({ nullable: false })
	bhid: number;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: false })
	lastSynced: number;

	constructor(partial: Partial<BHIDEntity>) {
		Object.assign(this, partial);
	}
}

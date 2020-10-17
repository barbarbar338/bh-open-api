import { Transform } from "class-transformer";
import { IsDefined, IsNumber, Min, Max, NotEquals } from "class-validator";

export class SyncLegendDTO {
    @IsDefined()
    @Transform(i => parseInt(i))
    @IsNumber()
    @Min(3)
    @Max(55)
    @NotEquals(17)
    @NotEquals(27)
    legend_id: number;
}

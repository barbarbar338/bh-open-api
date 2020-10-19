import { Injectable, HttpStatus } from "@nestjs/common";
import { APIRes } from "api-types";

@Injectable()
export class HealthService {
    public returnPing(): APIRes<null> {
        return {
            statusCode: HttpStatus.OK,
            message: "Pong!",
            data: null,
        };
    }
}

import { Controller, Get, HttpStatus } from "@nestjs/common";
import { APIRes } from "api-types";

@Controller()
export class AppController {
    @Get()
    returnPing(): APIRes {
        return {
            statusCode: HttpStatus.OK,
            message: "Pong!",
            data: null,
        };
    }
}

import { NestFactory } from "@nestjs/core";
import {
	FastifyAdapter,
	NestFastifyApplication,
} from "@nestjs/platform-fastify";
import config from "./config";
import { AppModule } from "./app.module";
import * as morgan from "morgan";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);

	app.enableCors({
		origin: "*",
	});
	app.use(morgan("dev"));

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	);

	app.setGlobalPrefix(config.API_VERSION);

	await app.listen(config.PORT, "0.0.0.0");
}

bootstrap();

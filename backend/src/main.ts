import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
	FastifyAdapter,
	NestFastifyApplication,
} from "@nestjs/platform-fastify";
import * as morgan from "morgan";
import { AppModule } from "./app.module";
import config from "./config";

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

bootstrap().catch((error: Error) => {
	Logger.error(
		`Error starting application: ${error.message}`,
		error.stack,
		"Main",
	);
	process.exit(1);
});

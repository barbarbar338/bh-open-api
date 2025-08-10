import { setApiKey } from "@barbarbar338/bhapi";
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
	Logger.log("Setting Brawlhalla API key", "BHAPI");
	setApiKey(config.BH_API_KEY);
	Logger.log("Brawlhalla API key set successfully", "BHAPI");

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

	app.setGlobalPrefix(config.API_PREFIX);

	await app.listen(config.PORT, "0.0.0.0");
}

bootstrap()
	.then(() => {
		Logger.log(
			"Application started successfully on " + config.PORT,
			"Main",
		);
	})
	.catch((error: Error) => {
		Logger.error(
			`Error starting application: ${error.message}`,
			error.stack,
			"Main",
		);
		process.exit(1);
	});

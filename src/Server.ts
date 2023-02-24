import { join } from "path";
import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import "@tsed/swagger";
import { config } from "./config/index";
import * as rest from "./controllers/rest/index";
import * as pages from "./controllers/pages/index";
import { Env } from "@tsed/core";

export const rootDir = __dirname;
export const isProduction = process.env.NODE_ENV === Env.PROD;

@Configuration({
	...config,
	acceptMimes: ["application/json", "text/html", "text/plain"],
	httpPort: process.env.PORT || 8083,
	httpsPort: false, // CHANGE in PROD
	disableComponentsScan: true,
	neo: {
		url: process.env.NEO_URL,
		username: process.env.NEO_USERNAME,
		password: process.env.NEO_PASSWORD,
	},
	mount: {
		"/api": [...Object.values(rest)],
		"/": [...Object.values(pages)],
	},
	swagger: [
		{
			path: "/doc",
			specVersion: "3.0.1",
			outFile: `${rootDir}/out/swagger.json`,
			// showExplorer: true, // display search bar
		},
	],
	middlewares: [
		"cors",
		"cookie-parser",
		"compression",
		"method-override",
		"json-parser",
		{ use: "urlencoded-parser", options: { extended: true } },
	],
	views: {
		root: join(`${rootDir}/views`),
		extensions: {
			ejs: "ejs",
		},
	},
	exclude: ["**/*.spec.ts"],
	logger: {
		disableRoutesSummary: isProduction, // remove table with routes summary
	},
})
export class Server {
	@Inject()
	protected app: PlatformApplication;

	@Configuration()
	protected settings: Configuration;
}

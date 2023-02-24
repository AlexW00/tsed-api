import { Constant, Service } from "@tsed/di";
import { $log } from "@tsed/logger";

import neo4j, { Driver } from "neo4j-driver";

import { NeoConfigurationModel } from "src/models/NeoConfigurationModel";

@Service()
export class NeoService {
	@Constant("neo", NeoConfigurationModel)
	private readonly config: NeoConfigurationModel;

	private driver: Driver;

	getSession() {
		return this.driver.session();
	}

	async $onInit() {
		$log.info("NeoService is initializing");
		this.driver = neo4j.driver(
			this.config.url,
			neo4j.auth.basic(this.config.username, this.config.password)
		);
	}

	async $onDestroy() {
		$log.info("NeoService is destroying");
		await this.driver.close();
	}
}

import { Constant, Service } from "@tsed/di";
import { $log } from "@tsed/logger";

import neo4j, { Driver } from "neo4j-driver";
import { NodeModel } from "src/models/graph/nodes/NodeModel";

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

	async getRandomNode(): Promise<NodeModel | undefined> {
		const session = this.getSession();
		try {
			const readRandomElement = `
			MATCH (a)-[]->(t) 
			RETURN a, rand() as r
			ORDER BY r
			`;

			const readResult = await session.executeRead((tx) =>
				tx.run(readRandomElement)
			);
			const result = readResult.records[0]?.get(0);
			if (result) {
				return NodeModel.fromNeo4jNode(result);
			} else {
				throw new Error("No nodes found");
			}
		} catch (error) {
			throw error;
		} finally {
			await session.close();
		}
	}
}

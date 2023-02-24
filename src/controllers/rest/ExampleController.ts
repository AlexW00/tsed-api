import { Controller } from "@tsed/di";
import { InternalServerError } from "@tsed/exceptions";
import { QueryParams } from "@tsed/platform-params";
import { Description, Get, Required, Returns } from "@tsed/schema";
import { NeoService } from "src/services/NeoService";

@Controller("/example")
export class ExampleController {
	constructor(private readonly neoService: NeoService) {}

	@Get("/hello")
	@Description("Greets you with a hello message")
	@Returns(200, String).ContentType("text/plain")
	hello(@Required() @QueryParams("name") name: string) {
		return "hello " + name + "!";
	}

	@Get("/neo-test")
	@Description("Returns a random node from the Neo4j database")
	@Returns(200, Object)
	@Returns(500)
	async neoTest() {
		const session = this.neoService.getSession();
		try {
			const readRandomElement = `
			MATCH (a)-[]->(t) 
			RETURN a, rand() as r
			ORDER BY r
			`;
			const readResult = await session.executeRead((tx) =>
				tx.run(readRandomElement)
			);
			return readResult.records[0]?.get(0) ?? {};
		} catch (error) {
			throw new InternalServerError(error.message);
		} finally {
			await session.close();
		}
	}
}

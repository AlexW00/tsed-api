import { Controller } from "@tsed/di";
import { InternalServerError } from "@tsed/exceptions";
import { QueryParams } from "@tsed/platform-params";
import { Description, Get, Required, Returns } from "@tsed/schema";
import { NodeModel } from "src/models/graph/nodes/NodeModel";
import { NeoService } from "src/services/NeoService";

@Controller("/example")
export class ExampleController {
	// Use NeoService via dependency injection
	constructor(private readonly neoService: NeoService) {}

	@Get("/hello")
	@Description("Greets you with a hello message")
	@Returns(200, String).ContentType("text/plain")
	hello(@Required() @QueryParams("name") name: string) {
		return "hello " + name + "!";
	}

	@Get("/neo-test")
	@Description("Returns a random node from the Neo4j database")
	@Returns(200, NodeModel)
	@Returns(500)
	async neoTest() {
		try {
			return await this.neoService.getRandomNode();
		} catch (e) {
			throw new InternalServerError(e.message);
		}
	}
}

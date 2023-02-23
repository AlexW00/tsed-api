import { Controller } from "@tsed/di";
import { QueryParams } from "@tsed/platform-params";
import { Get, Required, Returns } from "@tsed/schema";
import { HelloWorldModel } from "./models/HelloWorldModel";

@Controller("/hello-world")
export class HelloWorldController {
	@Get("/")
	@Returns(200, HelloWorldModel)
	get() {
		return { body: "Hello World" };
	}
}

@Controller("/hello-world-2")
export class HelloWorldController2 {
	@Get("/")
	@Returns(200, HelloWorldModel)
	get(@Required() @QueryParams("name") name: string) {
		console.log(name);
		return { body: "Hello World from " + name };
	}
}

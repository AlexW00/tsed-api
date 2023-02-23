import { Controller } from "@tsed/di";
import { QueryParams } from "@tsed/platform-params";
import { Get, MinLength, Property, Required } from "@tsed/schema";

@Controller("/hello-world")
export class HelloWorldController {
	@Get("/")
	get() {
		return "hello";
	}
}

class HelloWorldQueryParamModel {
	@Required()
	@MinLength(1)
	name: string;

	@Property()
	duration: number;
}

@Controller("/hello-world2")
export class HelloWorldController2 {
	@Get("/")
	get(@QueryParams() params: HelloWorldQueryParamModel) {
		console.log(params);
		return "hello";
	}
}

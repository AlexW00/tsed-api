import { Optional, Required } from "@tsed/schema";

export class EdgeModel {
	@Required()
	id: string;

	@Required()
	type: string;

	@Required()
	source: string;

	@Required()
	target: string;

	@Optional()
	properties: any;
}

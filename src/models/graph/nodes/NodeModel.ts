import { Optional, Required } from "@tsed/schema";

export class NodeModel {
	@Required()
	id: string;

	@Optional()
	labels: Array<string>;

	@Optional()
	properties: any;

	constructor(id: string, labels: Array<string> = [], properties?: any) {
		this.id = id;
		this.labels = labels;
		this.properties = properties;
	}

	static fromNeo4jNode(node: any): NodeModel | undefined {
		try {
			const id = node.elementId;
			const labels = node.labels;
			const properties = node.properties;
			// TODO: real validation
			if (id === undefined) return undefined;
			return new NodeModel(id, labels, properties);
		} catch (error) {
			return undefined;
		}
	}
}

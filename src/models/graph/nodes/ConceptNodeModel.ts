import { Required } from "@tsed/schema";
import { NodeModel } from "./NodeModel";

export class ConceptNodePropertiesModel {
	@Required()
	name: string;

	constructor(name: string) {
		this.name = name;
	}
}

export class ConceptNodeModel extends NodeModel {
	@Required()
	properties: ConceptNodePropertiesModel;

	constructor(id: string, name: string, labels: Array<string>) {
		super(id, labels);
		const properties = new ConceptNodePropertiesModel(name);
		this.properties = properties;
	}

	static fromNeo4jNode(node: any): ConceptNodeModel | undefined {
		try {
			const baseNode = NodeModel.fromNeo4jNode(node);
			// TODO: real validation
			if (baseNode === undefined || node.properties?.name === undefined)
				return undefined;
			return new ConceptNodeModel(
				baseNode.id,
				node.properties.name,
				baseNode.labels
			);
		} catch (error) {
			return undefined;
		}
	}
}

import { Required } from "@tsed/schema";
import { EdgeModel } from "./edges/EdgeModel";
import { NodeModel } from "./nodes/NodeModel";

export class GraphModel {
	@Required()
	nodes: Array<NodeModel>;

	@Required()
	edges: Array<EdgeModel>;

	constructor(nodes: Array<NodeModel>, edges: Array<EdgeModel>) {
		this.nodes = nodes;
		this.edges = edges;
	}
}

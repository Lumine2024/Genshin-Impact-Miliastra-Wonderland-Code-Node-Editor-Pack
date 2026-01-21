import { Graph } from "../utils/index.ts";
import { giaToRawIRModule } from "../src/convertor/gia_ir_raw.ts";

function run() {
  const graph = new Graph("ENTITY_NODE_GRAPH");
  const node = graph.add_node("Trigger.Entity_Related.On_Created");
  if (!node) {
    throw new Error("Failed to create trigger node");
  }
  const ir = giaToRawIRModule(graph);
  if (ir.graph.length !== 1) {
    throw new Error(`Expected 1 execution block, got ${ir.graph.length}`);
  }
  const starter = ir.graph[0].starter;
  if (starter.kind !== "trigger") {
    throw new Error(`Expected trigger starter, got ${starter.kind}`);
  }
  const expected = "Trigger_EntityRelated_OnCreated";
  if (starter.node.name !== expected) {
    throw new Error(`Expected node name ${expected}, got ${starter.node.name}`);
  }
}

run();

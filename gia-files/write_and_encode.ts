import { Graph, encode_gia_file } from "../utils";
import { NODES } from "../utils/node_data/game_nodes";

const graph = new Graph("ENTITY_NODE_GRAPH", undefined, "coin_written");

const enter_collision = graph.add_node(NODES.Trigger_CollisionTrigger_OnEnter);
const self_entity = graph.add_node(NODES.Query_EntityRelated_GetSelf);
const is_equal = graph.add_node(NODES.Arithmetic_General_Equal);
const branch = graph.add_node(NODES.Control_General_Branch);
const send_signal = graph.add_node(NODES.Execution_Signal_Send);

graph.flow(enter_collision, branch);
graph.flow(branch, send_signal, "True");

is_equal?.setConstraints("C<T:Ety>");
graph.connect(self_entity, is_equal, "self", "input1");
graph.connect(enter_collision, is_equal, "trigger_entity", "input2");
graph.connect(is_equal, branch, "result", "cond");

graph.autoLayout();
encode_gia_file("gia-files/coin_written.gia", graph.encode());

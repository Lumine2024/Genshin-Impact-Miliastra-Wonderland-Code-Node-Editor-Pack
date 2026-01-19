import { decode_gia_file, Graph } from "../utils/index"
import { stringify } from "../utils/node_data/node_type"

// 读取并解码示例 GIA 文件（从项目根运行时使用相对路径）
const bundle = decode_gia_file("./gia-files/coin.gia");
const graph = Graph.decode(bundle);

console.log("=== 节点图信息 ===");
console.log(`图名称: ${graph.graph_name}`);
console.log(`系统类型: ${graph.system}`);
console.log(`节点数量: ${graph.nodes.size}`);
console.log(`控制流连接数: ${graph.flows.length}`);
console.log(`数据流连接数: ${graph.connects.length}`);

console.log("\n=== 节点列表 ===");
graph.nodes.forEach(node => {
    console.log(`[${node.node_index}] ${node.def.Identifier}`);
    
    // 显示引脚常量值
    if (node.pin_values.size > 0) {
        node.pin_values.forEach((value, pinId) => {
            const pin = node.findDataPin(pinId);
            if (pin) {
                const typeStr = stringify(pin.Type);
                const valueStr = typeof value === 'object' ? JSON.stringify(value) : value;
                console.log(`  ├─ 参数: ${pinId} (${typeStr}) = ${valueStr}`);
            }
        });
    }
});

console.log("\n=== 控制流连接 ===");
if (graph.flows.length === 0) {
    console.log("(无控制流连接)");
} else {
    graph.flows.forEach(conn => {
        console.log(`[${conn.from.node_index}] ${conn.from.def.Identifier}`);
        console.log(`  └─ ${conn.from_pin.Identifier} → ${conn.to_pin.Identifier}`);
        console.log(`  └→ [${conn.to.node_index}] ${conn.to.def.Identifier}`);
    });
}

console.log("\n=== 数据流连接 ===");
if (graph.connects.length === 0) {
    console.log("(无数据流连接)");
} else {
    graph.connects.forEach(conn => {
        const fromType = stringify(conn.from_pin.Type);
        const toType = stringify(conn.to_pin.Type);
        console.log(`[${conn.from.node_index}] ${conn.from.def.Identifier}`);
        console.log(`  └─ ${conn.from_pin.Identifier}: ${fromType} → ${conn.to_pin.Identifier}: ${toType}`);
        console.log(`  └→ [${conn.to.node_index}] ${conn.to.def.Identifier}`);
    });
}

console.log("=== 调试：直接查看protobuf数据 ===");
bundle.primary_resource.graph_data?.inner.graph.nodes.forEach(node => {
    if (node.node_id === 1610612737 || node.node_id === 1610612738) {
        console.log(`\n节点ID: ${node.node_id}, index: ${node.index}`);
        console.log("引脚数据:");
        node.pins?.forEach((pin, idx) => {
            console.log(`  Pin ${idx}:`, JSON.stringify({
                identifier: pin.pin_id,
                value: pin.value,
                connections: pin.connections
            }, null, 2));
        });
    }
});

console.log("\n=== 节点图信息 ===");
console.log(`图名称: ${graph.graph_name}`);
console.log(`系统类型: ${graph.system}`);
console.log(`节点数量: ${graph.nodes.size}`);
console.log(`控制流连接数: ${graph.flows.length}`);
console.log(`数据流连接数: ${graph.connects.length}`);

console.log("\n=== 节点列表 ===");
graph.nodes.forEach(node => {
    console.log(`[${node.node_index}] ${node.def.Identifier}`);
    
    // 显示引脚常量值
    if (node.pin_values.size > 0) {
        node.pin_values.forEach((value, pinId) => {
            const pin = node.findDataPin(pinId);
            if (pin) {
                const typeStr = stringify(pin.Type);
                const valueStr = typeof value === 'object' ? JSON.stringify(value) : value;
                console.log(`  ├─ 参数: ${pinId} (${typeStr}) = ${valueStr}`);
            }
        });
    }
});

console.log("\n=== 控制流连接 ===");
if (graph.flows.length === 0) {
    console.log("(无控制流连接)");
} else {
    graph.flows.forEach(conn => {
        console.log(`[${conn.from.node_index}] ${conn.from.def.Identifier}`);
        console.log(`  └─ ${conn.from_pin.Identifier} → ${conn.to_pin.Identifier}`);
        console.log(`  └→ [${conn.to.node_index}] ${conn.to.def.Identifier}`);
    });
}

console.log("\n=== 数据流连接 ===");
if (graph.connects.length === 0) {
    console.log("(无数据流连接)");
} else {
    graph.connects.forEach(conn => {
        const fromType = stringify(conn.from_pin.Type);
        const toType = stringify(conn.to_pin.Type);
        console.log(`[${conn.from.node_index}] ${conn.from.def.Identifier}`);
        console.log(`  └─ ${conn.from_pin.Identifier}: ${fromType} → ${conn.to_pin.Identifier}: ${toType}`);
        console.log(`  └→ [${conn.to.node_index}] ${conn.to.def.Identifier}`);
    });
}
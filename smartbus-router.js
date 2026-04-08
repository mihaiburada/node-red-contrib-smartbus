module.exports = function(RED) {
    function SmartBusRouterNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        node.on("input", function(msg) {
            const decoded = msg.payload || msg.decoded;
            if (!decoded || typeof decoded !== "object") {
                node.error("Expected decoded SmartBus object in msg.payload or msg.decoded");
                return;
            }

            const cmd = (decoded.command || "").toLowerCase();
            const outputs = [null, null, null, null];

            if (cmd.includes("light") || cmd.includes("dimmer")) {
                outputs[0] = msg; // lighting
            } else if (cmd.includes("curtain") || cmd.includes("blind")) {
                outputs[1] = msg; // curtains
            } else if (cmd.includes("hvac") || cmd.includes("ac")) {
                outputs[2] = msg; // HVAC
            } else {
                outputs[3] = msg; // other
            }

            node.send(outputs);
        });
    }

    RED.nodes.registerType("smartbus-router", SmartBusRouterNode);
};

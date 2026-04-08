module.exports = function(RED) {
    const SmartBus = require("smart-bus");

    function SmartBusEncoderNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        const bus = new SmartBus();

        node.on("input", function(msg) {
            try {
                if (!msg.command || typeof msg.command !== "object") {
                    node.error("msg.command must be an object describing the HDL command");
                    return;
                }

                // You can adapt this to your fork's API
                const frame = bus.encode(msg.command);

                msg.payload = frame;
                node.send(msg);

            } catch (err) {
                node.error("SmartBus encode error: " + err.message);
            }
        });
    }

    RED.nodes.registerType("smartbus-encoder", SmartBusEncoderNode);
};

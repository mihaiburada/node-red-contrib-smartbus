module.exports = function(RED) {
    const SmartBus = require("smart-bus");

    function SmartBusNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        const bus = new SmartBus();

        node.on("input", function(msg) {
            try {
                if (!Buffer.isBuffer(msg.payload)) {
                    node.error("Payload must be a Buffer containing raw HDL frame");
                    return;
                }

                const decoded = bus.decode(msg.payload);

                msg.decoded = decoded;
                msg.payload = decoded;

                node.send(msg);

            } catch (err) {
                node.error("SmartBus decode error: " + err.message);
            }
        });
    }

    RED.nodes.registerType("smartbus", SmartBusNode);
};

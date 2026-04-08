module.exports = function(RED) {
    function SmartBusHADiscoveryNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        node.prefix = config.prefix || "homeassistant";

        node.on("input", function(msg) {
            const decoded = msg.payload || msg.decoded;
            if (!decoded || typeof decoded !== "object") {
                node.error("Expected decoded SmartBus object in msg.payload or msg.decoded");
                return;
            }

            const subnet = decoded.src?.subnet || decoded.subnet || 0;
            const device = decoded.src?.device || decoded.device || 0;
            const channel = decoded.channel || decoded.channelNo || 0;

            const uniqueId = `hdl_${subnet}_${device}_${channel}`;
            const name = decoded.name || `HDL ${subnet}.${device} Ch ${channel}`;

            const topicBase = `${node.prefix}/light/${uniqueId}`;
            const stateTopic = `${topicBase}/state`;
            const commandTopic = `${topicBase}/set`;

            msg.topic = `${topicBase}/config`;
            msg.payload = {
                name,
                unique_id: uniqueId,
                state_topic: stateTopic,
                command_topic: commandTopic,
                payload_on: "ON",
                payload_off: "OFF"
            };

            node.send(msg);
        });
    }

    RED.nodes.registerType("smartbus-ha-discovery", SmartBusHADiscoveryNode);
};

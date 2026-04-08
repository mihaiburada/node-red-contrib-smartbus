# node-red-contrib-smartbus

Node-RED nodes for working with HDL BusPro using the [`smart-bus`](https://github.com/mihaiburada/smart-bus) library.

## Nodes

### 1. SmartBus Decoder (`smartbus`)

**Category:** function  
**Inputs:** 1  
**Outputs:** 1  

Decodes raw HDL BusPro frames from a Buffer payload.

- **Input:**  
  - `msg.payload` — `Buffer` containing a raw HDL frame (e.g. from MQTT topic `BusToClient/...`)
- **Output:**  
  - `msg.payload` — decoded JSON object  
  - `msg.decoded` — same decoded JSON

### 2. SmartBus Encoder (`smartbus-encoder`)

**Category:** function  
**Inputs:** 1  
**Outputs:** 1  

Encodes a high-level command into a raw HDL frame.

- **Input:**  
  - `msg.command` — object describing the HDL command, e.g.:

    ```json
    {
      "subnet": 1,
      "device": 10,
      "channel": 1,
      "value": 100
    }
    ```

- **Output:**  
  - `msg.payload` — `Buffer` containing the encoded HDL frame

### 3. SmartBus Router (`smartbus-router`)

**Category:** function  
**Inputs:** 1  
**Outputs:** multiple  

Routes decoded frames to different

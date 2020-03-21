export default function () {
  return {
    ws: {},
    listening: false,

    clients: {
      // client are only an abstraction layer for flows
      "192.168.1.131": {
        active: true,
        flows: {
          "269b13c0-dc93-443a-b7ec-a06fdb014d03": {
            active: false,
            flowName: "client-zone00",
            serverIP: "192.168.1.248",
            packets: [
              {"packetType":"small","length":53,"department":4,"command":"35","opCode":4149,"data":"0a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","rawData":"3535100a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","friendlyName":"NC_CHAR_CHANGEPARAMCHANGE_CMD"},
              {"packetType":"small","length":2,"department":2,"command":"5","opCode":2053,"data":"","rawData":"020508","friendlyName":"NC_MISC_HEARTBEAT_ACK"},
              {"packetType":"small","length":53,"department":4,"command":"35","opCode":4149,"data":"0a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","rawData":"3535100a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","friendlyName":"NC_CHAR_CHANGEPARAMCHANGE_CMD"}
            ]
          },
          "269b13c0-dc93-443a-b7ec-a06fdb014d4": {
            active: false,
            flowName: "client-zone00",
            serverIP: "192.168.1.248",
            packets: [
              {"packetType":"small","length":53,"department":4,"command":"35","opCode":4149,"data":"0a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","rawData":"3535100a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","friendlyName":"NC_CHAR_CHANGEPARAMCHANGE_CMD"},
              {"packetType":"small","length":2,"department":2,"command":"5","opCode":2053,"data":"","rawData":"020508","friendlyName":"NC_MISC_HEARTBEAT_ACK"},
              {"packetType":"small","length":53,"department":4,"command":"35","opCode":4149,"data":"0a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","rawData":"3535100a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","friendlyName":"NC_CHAR_CHANGEPARAMCHANGE_CMD"}
            ]
          },
          "269b13c0-dc93-443a-b7ec-a06fdb014d5": {
            active: false,
            flowName: "client-zone00",
            serverIP: "192.168.1.248",
            packets: [
              {"packetType":"small","length":53,"department":4,"command":"35","opCode":4149,"data":"0a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","rawData":"3535100a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","friendlyName":"NC_CHAR_CHANGEPARAMCHANGE_CMD"},
              {"packetType":"small","length":2,"department":2,"command":"5","opCode":2053,"data":"","rawData":"020508","friendlyName":"NC_MISC_HEARTBEAT_ACK"},
              {"packetType":"small","length":53,"department":4,"command":"35","opCode":4149,"data":"0a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","rawData":"3535100a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","friendlyName":"NC_CHAR_CHANGEPARAMCHANGE_CMD"}
            ]
          },
        }
      },
      "192.168.1.132": {
        active: false,
        flows: {
          "269b13c0-dc93-443a-b7ec-a06fdb014d03": {
            flowName: "client-zone00",
            serverIP: "192.168.1.248",
            packets: [
              {"packetType":"small","length":53,"department":4,"command":"35","opCode":4149,"data":"0a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","rawData":"3535100a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","friendlyName":"NC_CHAR_CHANGEPARAMCHANGE_CMD"},
              {"packetType":"small","length":2,"department":2,"command":"5","opCode":2053,"data":"","rawData":"020508","friendlyName":"NC_MISC_HEARTBEAT_ACK"},
              {"packetType":"small","length":53,"department":4,"command":"35","opCode":4149,"data":"0a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","rawData":"3535100a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","friendlyName":"NC_CHAR_CHANGEPARAMCHANGE_CMD"}
            ]
          },
        }
      },
      "192.168.1.133": {
        active: false,
        flows: {
          "269b13c0-dc93-443a-b7ec-a06fdb014d03": {
            flowName: "client-zone00",
            serverIP: "192.168.1.248",
            packets: [
              {"packetType":"small","length":53,"department":4,"command":"35","opCode":4149,"data":"0a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","rawData":"3535100a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","friendlyName":"NC_CHAR_CHANGEPARAMCHANGE_CMD"},
              {"packetType":"small","length":2,"department":2,"command":"5","opCode":2053,"data":"","rawData":"020508","friendlyName":"NC_MISC_HEARTBEAT_ACK"},
              {"packetType":"small","length":53,"department":4,"command":"35","opCode":4149,"data":"0a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","rawData":"3535100a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000","friendlyName":"NC_CHAR_CHANGEPARAMCHANGE_CMD"}
            ]
          },
        }
      }
    }
  }
}

// what can happen...

// new packet arrives
//    push to clients client data if not exist
//    push packet to clients.[ip].flows[uuid].packets

// flow is terminated
//    check clientIP and flowUUID data is present
//    find the flow in question and set the field active to false

// {"flow_id":"269b13c0-dc93-443a-b7ec-a06fdb014d03","flow_name":"zone00-client","packet_id":0,"client_ip","server_ip":"192.168.1.248","timestamp":"2020-03-20 21:39:18.244519 +0100 CET","packet_data":"{\"packetType\":\"small\",\"length\":53,\"department\":4,\"command\":\"35\",\"opCode\":4149,\"data\":\"0a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000\",\"rawData\":\"3535100a120000000013000000001400000000150000000016000000001700000000180000000019000000001a000000001b00000000\",\"friendlyName\":\"NC_CHAR_CHANGEPARAMCHANGE_CMD\"}"}:"192.168.1.131"

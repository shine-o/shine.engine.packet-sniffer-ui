import Vue from 'vue'
export function listenForPackets({state, commit, dispatch}) {
  if (state.listening) {
    return
  }

  let ws;

  try {
    ws = new WebSocket("ws://localhost:9090/packets");
    ws.onopen = function(evt) {
      console.log(evt);
    };

    ws.onclose = function(evt) {
      dispatch('stopListening');
      console.log(evt);
    };

    ws.onmessage = function(evt) {
      dispatch('handlePacket', JSON.parse(evt.data))
    };

    ws.onerror = function(evt) {
      dispatch('stopListening');
      console.log(evt);
    };

    commit('webSocket', ws);
    commit('listening', true);

  } catch (e) {
    console.log(e);
    commit('webSocket', {});
    commit('listening', false);
  }
}

export function stopListening({state, commit}) {
  state.ws.close();
  commit('webSocket', {});
  commit('listening', false);
}

export function client({state, commit, dispatch}, clientInfo) {
  if (state.clients.hasOwnProperty(clientInfo.clientIP)) {
    return
  }
  commit('newClient', clientInfo)
}

export function flow({state, commit, dispatch}, flowInfo) {
  if (state.flows.hasOwnProperty(flowInfo.clientFlowID)) {
    return
  }
  commit('newFlow', flowInfo)
}

export function packet({state, commit, dispatch}, packetInfo) {
  if (state.packets.hasOwnProperty(packetInfo.clientFlowID)) {
    // this flow has packet key, append packets
    commit('appendPacketToFlow', packetInfo)

  } else {
    // this flow has no packet key, add it
    commit('newFlowPackets', packetInfo)
  }
}

export function closeFlow({state, commit, dispatch}, flowInfo) {
  let clientFlowID = flowInfo.client_ip + '.' + flowInfo.flow_id;
  if (state.flows.hasOwnProperty(clientFlowID)) {
    commit('closeFlow', clientFlowID)
  }
}

export function handlePacket({state, commit, dispatch}, pJson) {

  if (pJson.hasOwnProperty("flow_completed")) {
    dispatch('closeFlow', pJson);
    return
  }

  dispatch('client', {
    clientIP: pJson.client_ip
  });

  let clientFlowID = pJson.client_ip + '.' + pJson.flow_id;
  // commit flow
  dispatch('flow', {
    clientFlowID: clientFlowID,
    clientIP: pJson.client_ip,
    flowID: pJson.flow_id,
    flowName: pJson.flow_name
  });

  // commit packet
  let pData = JSON.parse(pJson.packet_data);
  dispatch('packet', {
    clientFlowID: clientFlowID,
    packetID: pJson.packet_id,
    timeStamp: pJson.timestamp,
    data: pData
  });

  dispatch('filters', pData)
  // update client
  // fetch clients from state.

  // if client does not exist
  //    insert client data, flow data

  // else update flows
  //    if flow does not exist
  //       insert flow data
  //    else update flow data [ insert packets ]
}

export function filters({state, commit, dispatch}, pData) {
  // for each packet, push it to the filters object like this:
  // opcode: "friendlyName"
  // console.log(pData)
  if (state.opFilters.hasOwnProperty(pData.opCode)) {
    return
  }
  commit('newFilter', {
    opCode: pData.opCode,
    friendlyName: pData.friendlyName,
    activated: false
  })
}

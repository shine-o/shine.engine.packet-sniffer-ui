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
      // console.log(evt.data)
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

export function packet({state, commit, dispatch}, packet) {
  if (state.connections.hasOwnProperty(packet.connectionKey)) {
    // this flow has packet key, append packets
    commit('newConnectionPacket', packet)
  } else {
    // this flow has no packet key, add it
    commit('newConnection', packet.connectionKey)
    commit('newConnectionPacket', packet)

  }
}

export function closeConnection({state, commit, dispatch}, connectionKey) {
  if (state.connections.hasOwnProperty(connectionKey)) {
    commit('closeFlow',  connectionKey)
  }
}

export function handlePacket({state, commit, dispatch}, pJson) {

  if (pJson.hasOwnProperty("connectionClosed")) {
    dispatch('closeConnection', pJson.connectionKey);
    return
  }

  console.log(pJson);

  // commit packet
  dispatch('packet', pJson);
  dispatch('filters', pJson.packetData)
}

export function filters({state, commit, dispatch}, packet) {
  if (state.opFilters.hasOwnProperty(packet.opCode)) {
    return
  }
  commit('newFilter', {
    opCode: packet.opCode,
    friendlyName: packet.friendlyName,
    activated: false
  })
}

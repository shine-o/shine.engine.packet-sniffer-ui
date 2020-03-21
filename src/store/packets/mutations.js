import Vue from "vue";

export function listening(state, bool) {
  state.listening = bool
}

export function webSocket(state, ws) {
  state.ws = ws
}

export function newClient(state,  client) {
  Vue.set(this._modules.root.state.packets.clients, client.clientIP, {
    active: true
  })
}

export function newFlow(state, flow) {
  Vue.set(this._modules.root.state.packets.flows, flow.clientFlowID, {
    flowID: flow.flowID,
    flowName: flow.flowName,
    active: true
  })
}

export function newFlowPackets(state, packetInfo) {
  Vue.set(this._modules.root.state.packets.packets, packetInfo.clientFlowID, {
    list: []
  })
}

export function appendPacketToFlow(state, packetInfo) {
  state.packets[packetInfo.clientFlowID].list.push(packetInfo)
}

export function newFilter(state, filter) {
  Vue.set(this._modules.root.state.packets.opFilters, filter.opCode, filter)
  // console.log(this._modules.root.state.packets.opFilters)
}

export function opFilters(state, opFilters) {
  console.log(opFilters)
  state.opFilters = opFilters
}

export function applyFilter(state, filters) {
  console.log(filters)
  state.appliedFilters = filters

}

export function closeFlow(state, clientFlowID) {
  state.flows[clientFlowID].active = false
}
